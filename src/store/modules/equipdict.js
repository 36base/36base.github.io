// import dolls from '../repositories/data/fairy';
import EquipRepository from '../../repositories/EquipRepository';

let equips = [];
EquipRepository.fetchAll().then((data) => { equips = data; });

function initFilter() {
  return {
    list: equips,
  };
}

const reducer = (state = initFilter(), action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
