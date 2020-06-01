import { handleActions } from 'redux-actions';
import EquipRepository from '../../repositories/TestEquipRepository';


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
