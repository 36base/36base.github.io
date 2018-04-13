export const ADD_FILTER = 'ADD_FILTER';
export const DELETE_FILTER = 'DELETE_FILTER';

export function addFilter(value) {
  return {
    type: ADD_FILTER,
    value,
  };
}

export function deleteFilter(value) {
  return {
    type: DELETE_FILTER,
    value,
  };
}
