import { combineReducers } from 'redux';

import common from './common';
import menu from './menu';
import doll from './doll';

export default combineReducers({ common, menu, doll });
