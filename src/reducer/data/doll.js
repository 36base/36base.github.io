import { dolls } from 'girlsfrontline-core';

const typeMap = new Map([
  [1, { no: 1, name: 'HG', fullName: 'Handgun' }],
  [2, { no: 2, name: 'SMG', fullName: 'Submachinegun' }],
  [3, { no: 3, name: 'RF', fullName: 'Rifle' }],
  [4, { no: 4, name: 'AR', fullName: 'Assault Rifle' }],
  [5, { no: 5, name: 'MG', fullName: 'Machinegun' }],
  [6, { no: 6, name: 'SG', fullName: 'Shotgun' }],
]);

const rankMap = new Map([
  [1, {
    no: 1,
    starCnt: 5,
    name: 'Extra',
    color: '#D5A3FD',
  }],
  [2, {
    no: 2,
    starCnt: 2,
    name: 'General',
    color: '#5DD9C3',
  }],
  [3, {
    no: 3,
    starCnt: 3,
    name: 'Rare',
    color: '#D6E35A',
  }],
  [4, {
    no: 4,
    starCnt: 4,
    name: 'Epochal',
    color: '#FDA809',
  }],
  [5, {
    no: 5,
    starCnt: 5,
    name: 'Legendary',
    color: '#D5A3FD',
  }],
]);

const iconMap = new Map([
  [1, new Map([
    [1, require('../../resources/images/typeicons/HG_extra.png')],
    [2, require('../../resources/images/typeicons/HG_general.png')],
    [3, require('../../resources/images/typeicons/HG_rare.png')],
    [4, require('../../resources/images/typeicons/HG_epochal.png')],
    [5, require('../../resources/images/typeicons/HG_legendary.png')],
  ])],
  [2, new Map([
    // [1, require('../../resources/images/typeicons/SMG_extra.png')],
    [2, require('../../resources/images/typeicons/SMG_general.png')],
    [3, require('../../resources/images/typeicons/SMG_rare.png')],
    [4, require('../../resources/images/typeicons/SMG_epochal.png')],
    [5, require('../../resources/images/typeicons/SMG_legendary.png')],
  ])],
  [3, new Map([
    [1, require('../../resources/images/typeicons/RF_extra.png')],
    [2, require('../../resources/images/typeicons/RF_general.png')],
    [3, require('../../resources/images/typeicons/RF_rare.png')],
    [4, require('../../resources/images/typeicons/RF_epochal.png')],
    [5, require('../../resources/images/typeicons/RF_legendary.png')],
  ])],
  [4, new Map([
    [1, require('../../resources/images/typeicons/AR_extra.png')],
    [2, require('../../resources/images/typeicons/AR_general.png')],
    [3, require('../../resources/images/typeicons/AR_rare.png')],
    [4, require('../../resources/images/typeicons/AR_epochal.png')],
    [5, require('../../resources/images/typeicons/AR_legendary.png')],
  ])],
  [5, new Map([
    // [1, require('../../resources/images/typeicons/MG_extra.png')],
    [2, require('../../resources/images/typeicons/MG_general.png')],
    [3, require('../../resources/images/typeicons/MG_rare.png')],
    [4, require('../../resources/images/typeicons/MG_epochal.png')],
    [5, require('../../resources/images/typeicons/MG_legendary.png')],
  ])],
  [6, new Map([
    [1, require('../../resources/images/typeicons/SG_extra.png')],
    [3, require('../../resources/images/typeicons/SG_rare.png')],
    [4, require('../../resources/images/typeicons/SG_epochal.png')],
    [5, require('../../resources/images/typeicons/SG_legendary.png')],
  ])],
]);

function getImage(id, skinNo, isDamaged) {
  const fname = `${id}${Number.isInteger(skinNo) ? `_${skinNo + 1}` : ''}`;
  return require(`../../resources/images/guns/${fname}${isDamaged ? '_D' : ''}.png`);
}

function hasUpgrade(id) {
  return [2, 51, 55, 57, 93, 94].indexOf(id) > 0;
}

const dollMap = new Map(dolls.map((doll) => {
  const type = typeMap.get(doll.type);
  const rank = rankMap.get(doll.id > 1000 ? 1 : doll.rank);
  const icon = iconMap.get(doll.type).get(doll.id > 1000 ? 1 : doll.rank);
  const portrait = require(`../../resources/images/portraits/${doll.id}.png`);
  const images = [
    { name: '기본', normal: getImage(doll.id, undefined, false), damaged: getImage(doll.id, undefined, true) },
    ...doll.skins.map((e, i) => ({
      name: e,
      normal: getImage(doll.id, i, false),
      damaged: getImage(doll.id, i, true),
    })),
  ];
  const skill = {
    id: 6,
    initCooldown: 6,
    dataPool: {
      PW: [12, 13, 14, 15, 16, 17, 18, 19, 20, 22],
      DR: [5, 6, 6, 6, 7, 7, 7, 8, 8, 8],
      CD: [15, 14.7, 14.3, 14, 13.7, 13.3, 13, 12.7, 12.3, 12],
    },
  };
  const info = {
    ...doll,
    type,
    rank,
    icon,
    images,
    portrait,
    skill,
  };

  return [doll.id, info];
}));

export default dollMap;
