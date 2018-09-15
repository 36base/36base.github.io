// import dolls from '../repositories/data/fairy';
import FairyRepository from '../repositories/FairyRepository';

let fairies = [];
FairyRepository.fetchAll().then((data) => { fairies = data; });

function initFilter() {
  return {
    list: fairies,
  };
}

const reducer = (state = initFilter(), action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
