import { RESIZE } from '../actions/common';

const initialState = {
  isMobile: screen.width < 660,
  width: screen.width,
  height: screen.height,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RESIZE:
      return Object.assign({}, state, {
        isMobile: action.width < 660,
        width: action.width,
        height: action.height,
      });
    default:
      return state;
  }
};

export default reducer;
