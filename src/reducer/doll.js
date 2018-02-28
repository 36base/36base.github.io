import dolls from 'girlsfrontline-core';

const typeNameMap = [undefined, 'HG', 'SMG', 'RF', 'AR', 'MG', 'SG'];
const rankNameMap = [undefined, 'extra', 'general', 'rare', 'epochal', 'legendary'];

const map = dolls.dolls.reduce((map, e) => {
  map[e.id] = e;
  return map;
}, {});

const initialState = {
  typeNameMap,
  rankNameMap,
  map,
  list: dolls.dolls,
};

const reducer = (state = initialState, action) => state;

export default reducer;
