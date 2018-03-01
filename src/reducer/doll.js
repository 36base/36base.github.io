import { dolls } from 'girlsfrontline-core';

const typeNameMap = [undefined, 'HG', 'SMG', 'RF', 'AR', 'MG', 'SG'];
const rankNameMap = [undefined, 'extra', 'general', 'rare', 'epochal', 'legendary'];

const map = new Map(dolls.map(obj => [obj.key, obj.val]));

const initialState = {
  typeNameMap,
  rankNameMap,
  map,
  list: dolls,
};

const reducer = (state = initialState) => state;

export default reducer;
