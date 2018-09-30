import { fairies } from 'girlsfrontline-core';
import Fairy from 'girlsfrontline-core/lib/fairy';

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

const buildData = fairy => Object.assign(
  fairy,
  {
    buildTime: (
      fairy.id > 1000
      || fairy.id === 18
      || fairy.id === 19
      || fairy.id === 20
    ) ? 0 : fairy.buildTime,
    images: buildImage(fairy.codename),
    skillIcon: buildIcon(fairy.codename),
  },
);

const getAll = () => fairies.map(fairy => buildData(new Fairy(fairy.toJSON())));

const getNewById = id => buildData(new Fairy(fairies.find(fairy => fairy.id === id).toJSON()));

export default { getAll, getNewById };
