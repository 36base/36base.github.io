import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { MuiThemeProvider } from 'material-ui/styles';
import { IntlProvider, addLocaleData } from 'react-intl';

import en from 'react-intl/locale-data/en';
import ko from 'react-intl/locale-data/ko';
import ja from 'react-intl/locale-data/ja';
import zh from 'react-intl/locale-data/zh';

import 'normalize.css';

import locale from '../locale/locale';
import theme from './theme';

import reducer from '../reducer';
import App from './App';

addLocaleData([...en, ...ko, ...ja, ...zh]);

const store = createStore(reducer, applyMiddleware(ReduxThunk));
const defaultLang = localStorage.getItem('lang') || 'en';

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <IntlProvider
            locale={defaultLang}
            messages={locale[defaultLang]}
          >
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </IntlProvider>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default hot(module)(Root);
