import { combineReducers } from 'redux';

import common from './common';
import menu from './menu';
import dolldict from './dolldict';
import fairydict from './fairydict';

export default combineReducers({
  common,
  menu,
  dolldict,
  fairydict,
});
