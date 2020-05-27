import { createAction, handleActions } from 'redux-actions';
import DollRepository from '../../repositories/TestDollRepository';
// import { propertyFilter, nameFilter } from '../../repositories/data/filter';

export const addFilter = createAction('__TEST__DollDict/ADD_FILTER');
export const deleteFilter = createAction('__TEST__DollDict/DELETE_FILTER');

/*
function apply(filters) {
  if (filters.length === 0) {
    return dolls;
  }

  const nameFilters = filters.filter(filter => filter.type === 'name');
  const rankFilters = filters.filter(filter => filter.type === 'rank');
  const typeFilters = filters.filter(filter => filter.type === 'type');
  return dolls.filter((doll) => {
    const nameFilterResult = nameFilters.every(filter => filter.predicate(doll));
    let rankFilterResult = false;
    if (rankFilters.length === 0) rankFilterResult = true;
    else {
      let flag = false;
      rankFilters.map((filter) => {
        const result = filter.predicate(doll);
        if (result) flag = true;
        return result;
      });
      if (flag === true) rankFilterResult = true;
    }

    let typeFilterResult = false;
    if (typeFilters.length === 0) typeFilterResult = true;
    else {
      let flag = false;
      typeFilters.map((filter) => {
        const result = filter.predicate(doll);
        if (result) flag = true;
        return result;
      });
      if (flag === true) typeFilterResult = true;
    }

    return nameFilterResult && rankFilterResult && typeFilterResult;
  });
}

function filter(filters, data) {
  if (data.type === 'name') {
    const ids = [];
    Array.from(nameFilter.keys()).forEach((key) => {
      if (String(key).indexOf(data.value) >= 0) {
        ids.push(...(nameFilter.get(String(key))));
      }
    });
    filters.push({
      type: 'name',
      query: data.value,
      predicate: doll => ids.indexOf(doll.id) >= 0,
    });
  } else {
    filters.push({
      type: data.type,
      query: data.value,
      predicate: propertyFilter.get(data.value),
    });
  }

  return {
    list: apply(filters),
    filters,
  };
}

function removeFilter(filters, value) {
  filters.splice(filters.indexOf(value), 1);

  return {
    list: apply(filters),
    filters,
  };
}
*/

function initFilter() {
  return {
    dolls: DollRepository.getAll(),
    filters: [],
  };
}

const reducer = handleActions(
  {
    // DollDict/ADD_FILTER: (state, { payload: value }) => filter([...state.filters], value),
    // DollDict/DELETE_Filter: (state, { payload: value }) => removeFilter([...state.filters], value),
  },
  initFilter(),
);

export default reducer;
