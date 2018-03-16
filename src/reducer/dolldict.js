import dolls from '../repositories/data/doll';
import { propertyFilter, nameFilter } from '../repositories/data/filter';
import { ADD_FILTER, DELETE_FILTER } from '../actions/dolldict';

function apply(filters) {
  if (filters.length === 0) {
    return dolls;
  }

  return dolls.filter(doll => filters.every(filter => filter.predicate(doll)));
}

function addFilter(filters, value) {
  if (propertyFilter.has(value)) {
    filters.push({
      type: 'type',
      query: value,
      predicate: propertyFilter.get(value),
    });
  } else {
    const ids = [];
    Array.from(nameFilter.keys()).forEach((key) => {
      if (key.indexOf(value) >= 0) {
        ids.push(nameFilter.get(key));
      }
    });
    filters.push({
      type: 'name',
      query: value,
      predicate: doll => ids.indexOf(doll.id) >= 0,
    });
  }

  return {
    list: apply(filters),
    filters,
  };
}

function deleteFilter(filters, value) {
  filters.splice(filters.indexOf(value), 1);

  return {
    list: apply(filters),
    filters,
  };
}

function initFilter() {
  return {
    list: dolls,
    filters: [],
  };
}

const reducer = (state = initFilter(), action) => {
  switch (action.type) {
    case ADD_FILTER:
      return addFilter([...state.filters], action.value);
    case DELETE_FILTER:
      return deleteFilter([...state.filters], action.value);
    default:
      return state;
  }
};

export default reducer;
