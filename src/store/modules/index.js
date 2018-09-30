import { combineReducers } from 'redux';

import common from './common';
import menu from './menu';
import dollDict from './dollDict';
import equipDict from './equipDict';
import fairyDict from './fairyDict';

export default combineReducers({
  common,
  menu,
  dollDict,
  equipDict,
  fairyDict,
});
