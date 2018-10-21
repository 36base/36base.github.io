import { dolls } from 'girlsfrontline-core';
import Doll from 'girlsfrontline-core/lib/doll';

import gfextradata from 'girlsfrontline-extra-data';
import dollRank from './data/dollRank.json';

const { alias: { doll: dollAlias } } = gfextradata({ locale: 'ko' });

const buildData = (doll) => {
  const { id, skins } = doll;

  const rank = (parseInt((Number(id) / 1000), 10) === 1) ? 1 : doll.rank;

  return Object.assign(
    doll,
    {
      skins: skins.filter(skin => parseInt(skin.id / 1000, 10) !== 5), // 5000 번대 스킨 쓸모없는 것 같음
      rank: dollRank[rank],
      alias: dollAlias[doll.id] || [],
    },
  );
};

const dollMap = new Map(dolls.map(e => [e.id, e]));

const getAll = () => {
  const dollDict = {};

  dollMap.forEach((e, id) => {
    dollDict[id] = buildData(new Doll(e.toJSON()));
  });

  return dollDict;
};

const getNewById = (id) => {
  const doll = dollMap.get(id);
  if (!doll) { return null; }

  return buildData(new Doll(doll.toJSON()));
};

export default { getAll, getNewById };
