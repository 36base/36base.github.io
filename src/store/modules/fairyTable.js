import { createAction, handleActions } from 'redux-actions';

const defaultState = {
  orderBy: '',
  order: 'asc',
};

export const sort = createAction('SORT');

export default handleActions(
  {
    SORT: (state, { payload: orderBy }) => {
      let order = 'desc';

      if (state.orderBy === orderBy && state.order === 'desc') {
        order = 'asc';
      }

      return {
        ...state, order, orderBy,
      };
    },
  },
  defaultState,
);
