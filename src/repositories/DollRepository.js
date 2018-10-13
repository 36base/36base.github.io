import { dolls } from 'girlsfrontline-core';
import Doll from 'girlsfrontline-core/lib/doll';

// import gfextradata from 'girlsfrontline-extra-data';
import dollRank from './data/dollRank.json';

// const { dollNickname } = gfextradata({ locale: 'ko' });

const buildData = (doll) => {
  const { id, skins } = doll;

  const rank = (parseInt((Number(id) / 1000), 10) === 1) ? 1 : doll.rank;

  return Object.assign(
    doll,
    {
      skins: skins.filter(skin => parseInt(skin.id / 1000, 10) !== 5), // 5000 번대 스킨 쓸모없는 것 같음
      rank: dollRank[rank],
    },
  );
};

// const dollList = dolls.map(doll => buildData(doll));
// const dollMap = new Map(dollList.map(e => [e.id, e]));

const getAll = () => dolls.map(doll => buildData(new Doll(doll.toJSON())));
const getNewById = (id) => {
  const doll = dolls.find(item => item.id === id);
  if (!doll) { return null; }

  return buildData(new Doll(doll.toJSON()));
};

export default { getAll, getNewById };
