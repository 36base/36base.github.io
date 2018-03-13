import { combineReducers } from 'redux';

import common from './common';
import menu from './menu';
import dolldict from './dolldict';
import dolldetail from './dolldetail';

export default combineReducers({
  common,
  menu,
  dolldict,
  dolldetail,
});
