import { createAction, handleActions } from 'redux-actions';
import FairyRepository from '../../repositories/TestFairyRepository';

const initialstate = {
  fairies: FairyRepository.getAll(),
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
