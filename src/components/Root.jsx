import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { MuiThemeProvider } from 'material-ui/styles';

import 'normalize.css';
import theme from './theme';

import reducer from '../reducer';
import App from './App';

//const store = createStore(
//  reducer, {},
//  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//);

const store = createStore(reducer, applyMiddleware(ReduxThunk));

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
