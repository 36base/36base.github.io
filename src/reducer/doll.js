import dolls from '../repositories/doll';

const initialState = {
  list: dolls,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
