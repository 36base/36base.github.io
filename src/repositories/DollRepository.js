import { dolls } from 'girlsfrontline-core';
import Doll from 'girlsfrontline-core/lib/doll';

// import gfextradata from 'girlsfrontline-extra-data';
import dollRank from './data/dollRank.json';

// const { dollNickname } = gfextradata({ locale: 'ko' });

const buildData = (doll) => {
  const { id } = doll;

  const rank = (parseInt((Number(id) / 1000), 10) === 1) ? 1 : doll.rank;

  let { codename } = doll;
  let spinecodename = codename;

  switch (id) {
    case 121: codename = 'MK48'; break;
    case 124: spinecodename = 'SuperSass'; break;
    default: break;
  }

  return Object.assign(
    doll,
    {
      codename,
      spinecodename,
      rank: dollRank[rank],
    },
  );
};

// const dollList = dolls.map(doll => buildData(doll));
// const dollMap = new Map(dollList.map(e => [e.id, e]));

const getAll = () => dolls.map(doll => buildData(new Doll(doll.toJSON())));
const getNewById = id => buildData(new Doll(dolls.find(equip => equip.id === id).toJSON()));

export default { getAll, getNewById };
