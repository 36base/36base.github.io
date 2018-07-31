import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import en from 'react-intl/locale-data/en';
import ko from 'react-intl/locale-data/ko';
import ja from 'react-intl/locale-data/ja';
import zh from 'react-intl/locale-data/zh';

import App from './App';
import locale from '../locale/locale';

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
      lang: cookies.get('lang'),
    };
  }

  render() {
    const { lang } = this.state;
    if (!(lang === undefined)) {
      defaultLang = localStorage.getItem('lang') || lang;
    }
    return (
      <IntlProvider
        locale={defaultLang}
        messages={locale[defaultLang]}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </IntlProvider>
    );
  }
}

export default withCookies(IntlApp);
