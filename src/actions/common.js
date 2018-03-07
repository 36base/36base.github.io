export const RESIZE = 'IS_MOBILE';

export function resize(width, height) {
  return {
    type: RESIZE,
    width,
    height,
  };
}
