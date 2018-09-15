import { dolls } from 'girlsfrontline-core';

// import gfextradata from 'girlsfrontline-extra-data';
import dollRanks from './data/dollRank';
import dollTypes from './data/dollType';

const domain = 'https://girlsfrontline.kr/hotlink-ok/girlsfrontline-resources/images';
const typeMap = new Map(dollTypes.map(e => [e.code, e]));
const rankMap = new Map(dollRanks.map(e => [e.id, e]));

// const { dollNickname } = gfextradata({ locale: 'ko' });

function getTypeIcon(typeId, rankId) {
  const type = typeMap.get(typeId).code.toUpperCase();

  return `${domain}/typeicons/${type}${rankId}.png`;
}
const dollList = dolls.map((doll) => {
  const rank = (parseInt((Number(doll.id) / 1000), 10) === 1) ? 1 : doll.rank;

  return Object.assign(
    doll,
    {
      rank: rankMap.get(rank) || {},
      icon: getTypeIcon(doll.type, rank),
      portrait: `${domain}/portraits/${doll.id}.png`,
    },
  );
});

const dollMap = new Map(dollList.map(e => [e.id, e]));

async function fetchAll() {
  return dollList;
}

async function fetchById(id) {
  return dollMap.get(id);
}

export default { fetchAll, fetchById };
