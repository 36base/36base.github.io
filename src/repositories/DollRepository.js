// import { dolls, skills } from 'girlsfrontline-core';
import { dolls } from 'girlsfrontline-core';
import dollRanks from './data/dollRank';
import dollTypes from './data/dollType';
import dollSpines from './data/dollSpines';

const domain = 'https://girlsfrontline.kr/hotlink-ok/girlsfrontline-resources/images';
const typeMap = new Map(dollTypes.map(e => [e.code, e]));
const rankMap = new Map(dollRanks.map(e => [e.id, e]));
// const skillMap = new Map(skills.map(e => [e.id, e]));
const spineMap = new Map(Object.keys(dollSpines).map(k => [Number(k), dollSpines[k]]));

function getTypeIcon(typeId, rankId) {
  const type = typeMap.get(typeId).code.toUpperCase();

  return `${domain}/typeicons/${type}${rankId}.png`;
}

function getImage(id, skinNo, isDamaged) {
  const fname = `${id}${Number.isInteger(skinNo) ? `_${skinNo + 1}` : ''}`;
  return `${domain}/guns/${fname}${isDamaged ? '_D' : ''}.png`;
}

function buildImage(id, skins, spine) {
  if (!skins) return [];
  const spineNames = spine ? Object.keys(spine.names) : Array.fill(skins.length + 1);

  const base = {
    name: '기본',
    spineCode: spineNames[0],
    normal: getImage(id, undefined, false),
    damaged: getImage(id, undefined, true),
  };

  return [
    base,
    ...skins.map((e, i) => ({
      name: e,
      spineCode: spineNames[i + 1],
      normal: getImage(id, i, false),
      damaged: getImage(id, i, true),
    })),
  ];
}

/*
function buildSkill(skill) {
  const base = skillMap.get(skill.id);

  return {
    id: skill.id,
    name: skill.name || base.name,
    path: `${domain}/skill/${skill.path || base.path}.png`,
    desc: base.desc,
    data: base.data,
    dataPool: skill.dataPool,
    nightDataPool: skill.nightDataPool,
  };
}
*/

function buildSkill(skill) {
  return {
    id: skill.id,
    name: skill.name,
    path: `${domain}/skill/${skill.path}.png`,
    desc: skill.desc,
    data: skill.data,
    dataPool: skill.dataPool,
    nightDataPool: skill.nightDataPool,
  };
}

const dollList = dolls.map((doll) => {
  const rank = doll.id > 1000 ? 1 : doll.rank;
  const spine = spineMap.get(doll.id);

  return {
    id: doll.id,
    name: doll.name,
    krName: doll.krName,
    nicknames: doll.nick,
    illust: doll.illust,
    voice: doll.voice,
    type: typeMap.get(doll.type) || {},
    rank: rankMap.get(rank) || {},
    spineCode: spine ? spine.code : undefined,
    icon: getTypeIcon(doll.type, rank),
    portrait: `${domain}/portraits/${doll.id}.png`,
    images: buildImage(doll.id, doll.skins, spine),
    stats: doll.stats,
    effect: doll.effect,
    skill: buildSkill(doll.skill),
    getSkill: doll.getSkill,
    acquisition: {
      build: doll.buildTime,
      drop: doll.drop,
    },
  };
});

/*
const dollList = dolls.map((doll) => {
  const rank = doll.id > 1000 ? 1 : doll.rank;
  const spine = spineMap.get(doll.id);

  return {
    id: doll.id,
    name: doll.name,
    krName: doll.krName,
    nicknames: doll.nick,
    illust: doll.illust,
    voice: doll.voice,
    type: typeMap.get(doll.type) || {},
    rank: rankMap.get(rank) || {},
    spineCode: spine ? spine.code : undefined,
    icon: getTypeIcon(doll.type, rank),
    portrait: `${domain}/portraits/${doll.id}.png`,
    images: buildImage(doll.id, doll.skins, spine),
    stats: doll.stats,
    effect: doll.effect,
    skill: doll.getSkill(),
    getSkill: doll.getSkill,
    acquisition: {
      build: doll.buildTime,
      drop: doll.drop,
    },
    color: colorMap.get(doll.id),
  };
});
*/

const dollMap = new Map(dollList.map(e => [e.id, e]));

async function fetchAll() {
  return dollList;
}

async function fetchById(id) {
  return dollMap.get(id);
}

export default { fetchAll, fetchById };
