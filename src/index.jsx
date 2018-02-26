import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './controller/reducer';
import App from './components/app';

const store = createStore(reducer);
const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , app
);
