import fairy from '../repositories/data/fairy';

function initFilter() {
  return {
    list: fairy,
  };
}

const reducer = (state = initFilter(), action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
