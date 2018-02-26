import * as types from './type';

const initialState = {
  width: screen.width,
  height: screen.height,
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.RESIZE:
      return Object.assign({}, state, {
          width: action.width,
          height: action.height,
          isMobile: action.width < 767,
      });
    default:
      return state;
  }
};

export default reducer;
