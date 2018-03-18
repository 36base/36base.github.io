import { combineReducers } from 'redux';

import common from './common';
import menu from './menu';
import dolldict from './dolldict';

export default combineReducers({
  common,
  menu,
  dolldict,
});
