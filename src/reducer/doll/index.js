import { dolls } from 'girlsfrontline-core';
import { SET_FOR_DOLL_DETAIL } from '../../actions/doll';

function getTypeName(typeId) {
  switch (typeId) {
    case 1:
      return 'HG';
    case 2:
      return 'SMG';
    case 3:
      return 'RF';
    case 4:
      return 'AR';
    case 5:
      return 'MG';
    case 6:
      return 'SG';
    default:
      return undefined;
  }
}

function getRankName(id, rank) {
  switch (rank) {
    case 2:
      return 'general';
    case 3:
      return 'rare';
    case 4:
      return 'epochal';
    case 5:
      return id > 1000 ? 'extra' : 'legendary';
    default:
      return undefined;
  }
}

function hasUpgrade(id) {
  return [2, 51, 55, 57, 93, 94].indexOf(id) > 0;
}

const dollList = dolls.map((doll) => {
  const typeName = getTypeName(doll.type);
  const rankName = getRankName(doll.id, doll.rank);

  const typeIcon = require(`./resources/typeicons/${typeName}_${rankName}.png`);
  const portrait = require(`./resources/portraits/${doll.id}.png`);

  const illust = {
    common: require(`./resources/illustrations/${doll.id}/0/common.png`),
    damaged: require(`./resources/illustrations/${doll.id}/0/damaged.png`),
  };

  const skinList = doll.skins.map((e, i) => ({
    name: e,
    illust: {
      common: require(`./resources/illustrations/${doll.id}/${i + 1}/common.png`),
      damaged: require(`./resources/illustrations/${doll.id}/${i + 1}/damaged.png`),
    },
  }));

  const upgrade = hasUpgrade(doll.id) ? {
    illust: {
      common: require(`./resources/illustrations/${doll.id}/upg/common.png`),
      damaged: require(`./resources/illustrations/${doll.id}/upg/damaged.png`),
    },
  } : undefined;

  return {
    ...doll,
    typeName,
    rankName,
    typeIcon,
    illust,
    portrait,
    skinList,
    upgrade,
  };
});

const map = new Map(dollList.map(obj => [obj.id, obj]));

const initialState = {
  map,
  list: dollList,
  selected: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FOR_DOLL_DETAIL:
      return Object.assign({}, state, {
        selected: map.get(action.id),
      });
    default:
      return state;
  }
};

export default reducer;
