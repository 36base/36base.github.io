import { createAction, handleActions } from 'redux-actions';
import FairyRepository from '../../repositories/FairyRepository';

let fairies = [];
FairyRepository.fetchAll().then((data) => { fairies = data; });

const initialstate = {
  list: fairies,
  viewType: 'module',
};

export const changeView = createAction('FairyDict/CHANGE_VIEW');

export default handleActions(
  {
    'FairyDict/CHANGE_VIEW': (state, { payload: viewType }) => ({ ...state, viewType }),
  },
  initialstate,
);
