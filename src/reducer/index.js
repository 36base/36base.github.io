import { combineReducers } from 'redux';

import common from './common';
import doll from './doll';
import equip from './equip';

export default combineReducers({ common, doll, equip });
