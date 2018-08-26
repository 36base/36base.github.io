import { dolls } from 'girlsfrontline-core';
import gfextradata from 'girlsfrontline-extra-data';
import dollRanks from './dollRank';
import dollTypes from './dollType';
// import dollSkills from './dollSkill';
import getDollSpine from './getDollSpine';

const domain = 'https://girlsfrontline.kr/hotlink-ok/girlsfrontline-resources/images';
const typeMap = new Map(dollTypes.map(e => [e.code, e]));
const rankMap = new Map(dollRanks.map(e => [e.id, e]));
// const skillMap = new Map(dollSkills.map((e, i) => [i, e]));
const spineMap = new Map(dolls.map(item => [Number(item.id), getDollSpine(item.id)]));

const { dollNickname } = gfextradata({ locale: 'ko' });

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
  const rank = (parseInt((Number(doll.id) / 1000), 10) === 1) ? 1 : doll.rank;
  const spine = spineMap.get(doll.id);

  let result = { };
  try {
    result = {
      id: doll.id,
      name: doll.name,
      krName: doll.krName,
      nicknames: (dollNickname[doll.id % 20000] ? dollNickname[doll.id % 20000] : []),
      illust: doll.illust,
      voice: doll.voice,
      type: typeMap.get(doll.type) || {},
      rank: rankMap.get(rank) || {},
      spineCode: spine ? spine.code : undefined,
      skins: (doll.id > 20000) ? {
        ...doll.skins,
        ...dolls.find(item => item.id === doll.id - 20000).skins,
      } : doll.skins,
      icon: getTypeIcon(doll.type, rank),
      portrait: `${domain}/portraits/${doll.id}.png`,
      images: buildImage(doll.id, Object.values(doll.skins) || [], spine),
      stats: doll.stats,
      effect: doll.effect,
      skill: buildSkill(doll.skill),
      getSkill: doll.getSkill,
      acquisition: {
        build: doll.buildTime,
        drop: doll.drop,
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

export default dollList;
