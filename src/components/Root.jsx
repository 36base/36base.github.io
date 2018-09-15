import React from 'react';
import { hot } from 'react-hot-loader';
import { MuiThemeProvider } from 'material-ui/styles';
import { CookiesProvider } from 'react-cookie';

import 'normalize.css';

import IntlApp from './IntlApp';
import theme from './theme';

class Root extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CookiesProvider>
          <IntlApp />
        </CookiesProvider>
      </MuiThemeProvider>
    );
  }
}

export default hot(module)(Root);
