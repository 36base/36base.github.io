import { fairies } from 'girlsfrontline-core';
import Fairy from 'girlsfrontline-core/lib/fairy';
import gfextradata from 'girlsfrontline-resource-extra';

const { alias: { fairy: fairyAlias } } = gfextradata({ locale: 'ko' });

const buildData = fairy => Object.assign(
  fairy,
  {
    buildTime: (
      fairy.id > 1000
      || fairy.id === 18
      || fairy.id === 19
      || fairy.id === 20
    ) ? 0 : fairy.buildTime,
    alias: fairyAlias[fairy.id] || [],
  },
);

const fairyMap = new Map(fairies.map(e => [e.id, e]));

const getAll = () => {
  const fairyDict = {};

  fairyMap.forEach((e, id) => {
    fairyDict[id] = buildData(new Fairy(e.toJSON()));
  });

  return fairyDict;
};

const getNewById = (id) => {
  const fairy = fairyMap.get(id);
  if (!fairy) { return null; }

  return buildData(new Fairy(fairy.toJSON()));
};

export default { getAll, getNewById };
