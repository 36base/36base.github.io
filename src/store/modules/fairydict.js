import { createAction, handleActions } from 'redux-actions';
import { fairies } from 'girlsfrontline-core';
import Fairy from 'girlsfrontline-core/lib/fairy';

const initialstate = {
  fairies: fairies.map(fairy => new Fairy(fairy.toJSON())).map(({
    id, codename, name, category, buildTime, skill, stats, introduce, description, skins,
  }) => ({
    id,
    codename,
    name,
    category,
    introduce,
    description,
    skins,
    buildTime,
    skill,
    pow: stats.pow || 0,
    hit: stats.hit || 0,
    dodge: stats.dodge || 0,
    criticalHarmRate: stats.criticalHarmRate || 0,
    armor: stats.armor || 0,
  })),
  viewType: 'module',
  fairyTable: {
    orderBy: '',
    order: 'asc',
  },
};

export const changeView = createAction('FairyDict/CHANGE_VIEW');
export const sort = createAction('FairyTable/SORT');

export default handleActions(
  {
    'FairyDict/CHANGE_VIEW': (state, { payload: viewType }) => ({ ...state, viewType }),
    'FairyTable/SORT': (state, { payload: orderBy }) => {
      const { fairyTable } = state;
      let order = 'desc';

      if (fairyTable.orderBy === orderBy && fairyTable.order === 'desc') {
        order = 'asc';
      }

      return {
        ...state, fairyTable: { order, orderBy },
      };
    },
  },
  initialstate,
);
