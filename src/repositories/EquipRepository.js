
import { equips } from 'girlsfrontline-core';
import Equip from 'girlsfrontline-core/lib/equip';

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
  },
);

const getAll = () => equips.map(equip => buildData(new Equip(equip.toJSON())));

const getNewById = id => buildData(new Equip(equips.find(equip => equip.id === id).toJSON()));

export default { getAll, getNewById };
