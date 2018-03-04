import { equips } from 'girlsfrontline-core';

const categoryNameMap = [undefined, '부속', '탄약', '인형'];
const typeNameMap = [undefined, '옵티컬', '이오텍', '레드닷', '야시장비', '철갑탄', '특수탄', '산탄', '고속탄', '칩셋', '외골격', '방탄판', '??', '소음기', '탄약통', '슈트'];
const rankNameMap = [undefined, 'general', 'rare', 'epochal', 'legendary'];

const equipList = equips.map((equip) => {
  const { category, type, rank } = equip;

  const categoryName = categoryNameMap[category];
  const typeName = typeNameMap[type];
  const rankName = rankNameMap[rank];

  const sprite = require('./resources/1.png');

  return {
    ...equip,
    categoryName,
    typeName,
    rankName,
    sprite,
  };
});

const map = new Map(equipList.map((obj, index) => [index, obj]));

const initialState = {
  typeNameMap,
  rankNameMap,
  map,
  list: equipList,
};

const reducer = (state = initialState) => state;

export default reducer;
