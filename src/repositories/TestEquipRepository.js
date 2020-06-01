
import { equips } from 'girlsfrontline-core-test';
import Equip from 'girlsfrontline-core-test/lib/equip';
import gfextradata from 'girlsfrontline-extra-data';

const { alias: { equip: equipAlias } } = gfextradata({ locale: 'ko' });

const getColor = (rank) => {
  let color;
  switch (rank) {
    case 2: color = '#ccc'; break;
    case 3: color = '#6bdfce'; break;
    case 4: color = '#d6e35a'; break;
    case 5: color = '#ffcd4a'; break;
    default: color = '#ffcd4a'; break;
  }

  return color;
};

const buildData = equip => Object.assign(
  equip,
  {
    buildTime: ((equip.fitGuns || equip.company === '16Lab') ? 0 : equip.buildTime),
    color: getColor(equip.rank),
    alias: equipAlias[equip.id] || [],
  },
);

const equipMap = new Map(equips.map(e => [e.id, e]));

const getAll = () => {
  const equipDict = {};

  equipMap.forEach((e, id) => {
    equipDict[id] = buildData(new Equip(e.toJSON()));
  });

  return equipDict;
};

const getNewById = (id) => {
  const equip = equipMap.get(id);
  if (!equip) { return null; }

  return buildData(new Equip(equip.toJSON()));
};

export default { getAll, getNewById };
