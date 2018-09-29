import {
  createStore, applyMiddleware, combineReducers, compose,
} from 'redux';
import ReduxThunk from 'redux-thunk';

import common from './common';
import menu from './menu';
import dolldict from './dolldict';
import equipdict from './equipdict';
import fairydict from './fairydict';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(combineReducers({
  common,
  menu,
  dolldict,
  equipdict,
  fairydict,
}), composeEnhancers(applyMiddleware(ReduxThunk)));
