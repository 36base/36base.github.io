import { RESIZE } from '../actions/common';

const initialState = {
  isMobile: screen.width < 767,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RESIZE:
      return Object.assign({}, state, {
        isMobile: screen.width < 767,
      });
    default:
      return state;
  }
};

export default reducer;
