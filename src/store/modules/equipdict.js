import { handleActions } from 'redux-actions';
import EquipRepository from '../../repositories/EquipRepository';


function initFilter() {
  return {
    equips: EquipRepository.getAll(),
  };
}

const reducer = handleActions(
  { },
  initFilter(),
);

export default reducer;
