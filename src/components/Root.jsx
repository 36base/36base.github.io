import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { MuiThemeProvider } from 'material-ui/styles';
import { CookiesProvider } from 'react-cookie';

import 'normalize.css';

import IntlApp from './IntlApp';
import theme from './theme';
import reducer from '../reducer';

const store = createStore(reducer, applyMiddleware(ReduxThunk));

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <CookiesProvider>
            <IntlApp />
          </CookiesProvider>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default hot(module)(Root);
