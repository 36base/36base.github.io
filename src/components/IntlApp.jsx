import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import en from 'react-intl/locale-data/en';
import ko from 'react-intl/locale-data/ko';
import ja from 'react-intl/locale-data/ja';
import zh from 'react-intl/locale-data/zh';

import { init } from 'girlsfrontline-core';

import App from './App';
import locale from '../locale/locale';

import reducer from '../reducer';

addLocaleData([...en, ...ko, ...ja, ...zh]);

let defaultLang = localStorage.getItem('lang') || 'ko';

class IntlApp extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);

    const { cookies } = this.props;
    this.state = {
      loaded: 0, // for core module load
      store: null,
      lang: cookies.get('lang'),
    };
  }

  componentWillMount() {
    const coreInit = async () => {
      let lang = 'ko-KR';
      switch (this.state.lang) {
        case 'ko': lang = 'ko-KR'; break;
        case 'en': lang = 'en-US'; break;
        case 'ja': lang = 'ja-JP'; break;
        default: lang = 'ko-KR'; break;
      }
      await init({
        lng: lang,
        fallbackLng: lang,
        ns: 'gfcore',
        defaultNS: 'gfcore',
        backend: {
          loadPath: 'https://unpkg.com/girlsfrontline-core@latest/build/i18n/{{lng}}/{{ns}}.json',
          crossDomain: true,
        },
      });
    };
    coreInit().then(() => {
      this.setState({
        loaded: this.state.loaded + 1,
        store: createStore(reducer, applyMiddleware(ReduxThunk)),
      });
    });
  }

  render() {
    const { loaded, lang, store } = this.state;
    if (loaded === 0 || store === null) return (<div />);
    if (!(lang === undefined)) {
      defaultLang = localStorage.getItem('lang') || lang;
    }
    return (
      <IntlProvider
        locale={defaultLang}
        messages={locale[defaultLang]}
      >
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </IntlProvider>
    );
  }
}

export default withCookies(IntlApp);
