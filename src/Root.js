import React from 'react';
import { hot } from 'react-hot-loader';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import theme from './theme';
import store from './store';
import i18n from './i18n';
import App from './components/App';

// eslint-disable-next-line react/prefer-stateless-function
class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <MuiThemeProvider theme={theme}>
              <App />
            </MuiThemeProvider>
          </BrowserRouter>
        </I18nextProvider>
      </Provider>
    );
  }
}

export default hot(module)(Root);
