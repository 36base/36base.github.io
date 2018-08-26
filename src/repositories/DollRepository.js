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
  const spineNames = spine ? Object.keys(spine.names) : Array(skins.length + 1);

  const base = {
    name: '기본',
    spineCode: spineNames[0],
    normal: getImage(id, undefined, false),
    damaged: getImage(id, undefined, true),
  };

  const generalId = id < 20000 ? id : id - 20000;
  return [
    base,
    ...skins.map((e, i) => ({
      name: e,
      spineCode: spineNames[i + 1],
      normal: getImage(generalId, i, false),
      damaged: getImage(generalId, i, true),
    })),
  ];
}

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

  let result = { };
  try {
    result = {
      id: doll.id,
      name: doll.name,
      krName: doll.krName,
      nicknames: doll.nick,
      illust: doll.illust,
      voice: doll.voice,
      type: typeMap.get(doll.type) || {},
      rank: rankMap.get(rank) || {},
      spineCode: spine ? spine.code : undefined,
      skins: doll.skins,
      icon: getTypeIcon(doll.type, rank),
      portrait: `${domain}/portraits/${doll.id}.png`,
      images: buildImage(doll.id, Object.values(doll.skins) || [], spine),
      effect: doll.effect,
      getStats: doll.getStats,
      skill: buildSkill(doll.skill),
      getSkill: doll.getSkill,
      acquisition: {
        build: doll.buildTime,
        drop: doll.drop || [],
      },
    };

    if (doll.id > 20000) {
      result.skill2 = buildSkill(doll.skill2);
      result.getSkill2 = doll.getSkill2;
    }
  } catch (exception) {
    result = null;
  }
  return result;
}).filter(doll => doll !== null);

const dollMap = new Map(dollList.map(e => [e.id, e]));

async function fetchAll() {
  return dollList;
}

async function fetchById(id) {
  return dollMap.get(id);
}

export default { fetchAll, fetchById };
