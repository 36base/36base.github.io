import { dolls } from 'girlsfrontline-core';
import dollRanks from './dollRank';
import dollTypes from './dollType';
import dollSkills from './dollSkill';

const domain = 'https://girlsfrontline.kr/hotlink-ok/girlsfrontline-resources/images/';
const typeMap = new Map(dollTypes.map(e => [e.id, e]));
const rankMap = new Map(dollRanks.map(e => [e.id, e]));
const skillMap = new Map(dollSkills.map((e, i) => [i, e]));

function getTypeIcon(typeId, rankId) {
  const type = typeMap.get(typeId).shortName;

  return `${domain}/typeicons/${type}${rankId}.png`;
}

function getImage(id, skinNo, isDamaged) {
  const fname = `${id}${Number.isInteger(skinNo) ? `_${skinNo + 1}` : ''}`;
  return `${domain}/guns/${fname}${isDamaged ? '_D' : ''}.png`;
}

function buildImage(id, skins) {
  return [
    { name: '기본', normal: getImage(id, undefined, false), damaged: getImage(id, undefined, true) },
    ...skins.map((e, i) => ({
      name: e,
      normal: getImage(id, i, false),
      damaged: getImage(id, i, true),
    })),
  ];
}

function buildSkill(skill) {
  const base = skillMap.get(skill.id) || {};
  const dataPool = new Map(base.data.map(e => [e.key, { ...e, values: skill.dataPool[e.key] }]));

  return {
    id: skill.id,
    name: base.name,
    template: base.desc,
    icon: `${domain}/skill/${base.path}.png`,
    dataPool,
  };
}

const dollList = dolls.map((doll) => {
  const rank = doll.id > 1000 ? 1 : doll.rank;
  const skill = {
    id: 6,
    initCooldown: 6,
    dataPool: {
      PW: [12, 13, 14, 15, 16, 17, 18, 19, 20, 22],
      DR: [5, 6, 6, 6, 7, 7, 7, 8, 8, 8],
      CD: [15, 14.7, 14.3, 14, 13.7, 13.3, 13, 12.7, 12.3, 12],
    },
  };

  return {
    id: doll.id,
    name: doll.name,
    krName: doll.krName,
    nicknames: doll.nick,
    illust: doll.illust,
    voice: doll.voice,
    type: typeMap.get(doll.type) || {},
    rank: rankMap.get(rank) || {},
    icon: getTypeIcon(doll.type, rank),
    portrait: `${domain}/portraits/${doll.id}.png`,
    images: buildImage(doll.id, doll.skins),
    stats: doll.stats,
    effect: doll.effect,
    skill: buildSkill(skill),
    acquisition: {
      build: doll.buildTime,
      drop: doll.drop,
    },
  };
});

export default dollList;
