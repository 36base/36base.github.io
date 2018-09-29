import { combineReducers } from 'redux';

import common from './common';
import menu from './menu';
import dolldict from './dolldict';
import equipdict from './equipdict';
import fairydict from './fairydict';

export default combineReducers({
  common,
  menu,
  dolldict,
  equipdict,
  fairydict,
});
