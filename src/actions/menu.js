export const RESET_MENU = 'RESET_MENU';
export const TOGGLE_MENU = 'TOGGLE_MENU';

export function resetMenu() {
  return {
    type: RESET_MENU,
  };
}

export function toggleMenu(id) {
  return {
    type: TOGGLE_MENU,
    id: id,
  };
}
