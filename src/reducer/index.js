import { combineReducers } from 'redux';

import common from './common';

import menu from './menu';
import dolldict from './dolldict';
import equipdict from './equipdict';

export default combineReducers({
  common,
  menu,
  equipdict,
  dolldict,
});
