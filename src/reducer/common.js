import { RESIZE } from '../actions/common';

function getState() {
  const width = window.innerWidth;
  const height = window.innerHeight - 64;

  return {
    left: 0,
    top: 64,
    width,
    height,
  };
}

const reducer = (state = getState(), action) => {
  switch (action.type) {
    case RESIZE:
      return getState();
    default:
      return state;
  }
};

export default reducer;
