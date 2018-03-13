export const RESIZE = 'RESIZE';

export function resize(width, height) {
  return {
    type: RESIZE,
    width,
    height,
  };
}
