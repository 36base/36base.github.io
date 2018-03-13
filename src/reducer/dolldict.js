import dollData from './data/doll';

const initialState = {
  map: dollData,
  list: [...dollData.values()],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
