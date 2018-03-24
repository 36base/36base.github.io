import { combineReducers } from 'redux';

import common from './common';
import doll from './doll';
import equip from './equip';

import menu from './menu';
import dolldict from './dolldict';

export default combineReducers({
  common,
  menu,
  equip,
  dolldict,
});
