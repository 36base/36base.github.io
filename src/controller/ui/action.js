import * as types from './type';

export function resize() {
  return {
    type: types.RESIZE,
    width: screen.width,
    height: screen.height,
  };
}
