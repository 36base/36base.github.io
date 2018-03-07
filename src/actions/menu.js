export const TOGGLE_MOBILE = 'TOGGLE_MOBILE';
export const EXPAND = 'EXPAND';

export function toggleMobile() {
  return {
    type: TOGGLE_MOBILE,
  };
}

export function expand(id) {
  return {
    type: EXPAND,
    id,
  };
}
