import { dolls } from 'girlsfrontline-core';
import Doll from 'girlsfrontline-core/lib/doll';

// import gfextradata from 'girlsfrontline-extra-data';
import dollRank from './data/dollRank.json';


// const { dollNickname } = gfextradata({ locale: 'ko' });

const buildData = (doll) => {
  const rank = (parseInt((Number(doll.id) / 1000), 10) === 1) ? 1 : doll.rank;

  return Object.assign(
    doll,
    {
      rank: dollRank[rank],
    },
  );
};

// const dollList = dolls.map(doll => buildData(doll));
// const dollMap = new Map(dollList.map(e => [e.id, e]));

const getAll = () => dolls.map(doll => buildData(new Doll(doll.toJSON())));
const getNewById = id => buildData(new Doll(dolls.find(equip => equip.id === id).toJSON()));

export default { getAll, getNewById };
