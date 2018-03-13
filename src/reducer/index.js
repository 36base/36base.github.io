import { combineReducers } from 'redux';

import common from './common';
import menu from './menu';
import doll from './doll';
import dolldetail from './dolldetail';

export default combineReducers({
  common,
  menu,
  doll,
  dolldetail,
});
