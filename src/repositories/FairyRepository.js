import { fairy } from 'girlsfrontline-core';

const domain = 'https://girlsfrontline.kr/hotlink-ok/girlsfrontline-resources/images';


function getImage(name, mod) {
  const fname = `${name}_${mod}`.toLowerCase();
  return `${domain}/fairy/${fname}.png`;
}

function buildImage(name) {
  return {
    mod1: getImage(name, 1),
    mod2: getImage(name, 2),
    mod3: getImage(name, 3),
  };
}

// TODO:IMAGE 처리 (04-05)
const fairyList = fairy.map(Fairy => ({
  id: Fairy.id,
  name: Fairy.name,
  krName: Fairy.krName,
  category: Fairy.category,
  stats: Fairy.stats,
  grow: Fairy.grow,
  skill: Fairy.skill,
  buildTime: Fairy.buildTime,
  images: buildImage(Fairy.name),
}));

const fairyMap = new Map(fairyList.map(e => [e.id, e]));

async function fetchAll() {
  return fairyList;
}

async function fetchById(id) {
  return fairyMap.get(id);
}

export default { fetchAll, fetchById };

