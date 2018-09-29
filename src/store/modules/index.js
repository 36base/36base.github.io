import { combineReducers } from 'redux';

import common from './common';
import menu from './menu';
import dolldict from './dolldict';
import equipdict from './equipdict';
import fairyDict from './fairyDict';

export default combineReducers({
  common,
  menu,
  dolldict,
  equipdict,
  fairyDict,
});
