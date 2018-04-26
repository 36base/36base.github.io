import { equips } from 'girlsfrontline-core';

const categoryDict = {
  accessory: '부속',
  ammo: '탄환',
  doll: '인형',
};

const typeDict = {
  scope: '옵티컬',
  holo: '이오텍',
  reddot: '레드닷',
  nightvision: '야시장비',
  apBullet: '철갑탄',
  hpBullet: '특수탄',
  sgBullet: '산탄',
  hvBullet: '고속탄',
  chip: '칩셋',
  skeleton: '외골격',
  armor: '방탄판',
  special: '특수',
  silencer: '소음기',
  ammoBox: '탄약통',
  suit: '슈트',
};

const equipList = equips.map((equip) => {
  const krCategory = categoryDict[equip.category];
  const krType = typeDict[equip.type];

  return {
    ...equip,
    krCategory,
    krType,
  };
});

const map = new Map(equipList.map((obj, index) => [index, obj]));

const initialState = {
  map,
  list: equipList,
};

const reducer = (state = initialState) => state;

export default reducer;
