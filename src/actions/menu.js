export const CLEAR_MENU = 'CLEAR_MENU';
export const INIT_MENU = 'RESET_MENU';
export const TOGGLE_MENU = 'TOGGLE_MENU';

export function clearMenu() {
  return {
    type: CLEAR_MENU,
  };
}

export function initMenu() {
  return {
    type: INIT_MENU,
  };
}

export function toggleMenu(id) {
  return {
    type: TOGGLE_MENU,
    id,
  };
}
