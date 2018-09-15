import { fairies } from 'girlsfrontline-core';

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

function buildIcon(name) {
  return `${domain}/skill/${name}.png`;
}

const fairyList = fairies.map(fairy => (Object.assign(
  fairy,
  {
    buildTime: (
      fairy.id > 1000 ||
      fairy.id === 18 ||
      fairy.id === 19 ||
      fairy.id === 20
    ) ? 0 : fairy.buildTime,
    images: buildImage(fairy.codename),
    skillIcon: buildIcon(fairy.codename),
  },
))).filter(item => (item.id !== 0)); // 황금요정(18), 폭죽요정(20) skill 에러 터짐

const fairyMap = new Map(fairyList.map(e => [e.id, e]));

async function fetchAll() {
  return fairyList;
}

async function fetchById(id) {
  return fairyMap.get(id);
}

export default { fetchAll, fetchById };

