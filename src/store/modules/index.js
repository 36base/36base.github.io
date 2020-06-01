import { combineReducers } from 'redux';

import common from './common';
import menu from './menu';
import dollDict from './dollDict';
import testDollDict from './testDollDict';
import equipDict from './equipDict';
import testEquipDict from './testEquipDict';
import fairyDict from './fairyDict';
import testFairyDict from './testFairyDict';

export default combineReducers({
  common,
  menu,
  dollDict,
  equipDict,
  fairyDict,
  testDollDict,
  testEquipDict,
  testFairyDict,
});
