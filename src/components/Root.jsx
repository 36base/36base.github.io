import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { MuiThemeProvider } from 'material-ui/styles';

import 'normalize.css';
import theme from './theme';

import reducer from '../reducer';
import App from './App';

const store = createStore(reducer);

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <App />
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Root;
