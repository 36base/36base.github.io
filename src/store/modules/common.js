import { createAction, handleActions } from 'redux-actions';

const initialState = {
  isMobile: screen.width < 660,
  width: screen.width,
  height: screen.height,
};

export const resize = createAction('RESIZE', ({ width, height }) => ({ width, height }));

export default handleActions(
  {
    RESIZE: (state, { payload: { width, height } }) => Object.assign({}, state, {
      isMobile: width < 660,
      width,
      height,
    }),
  },
  initialState,
);
