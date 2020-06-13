
function buildTime2Str(time) {
  const hour = Number.parseInt(time / 3600, 10);
  const min = Number.parseInt((time - (hour * 3600)) / 60, 10);

  return `${String(hour).padStart(2, '0')}${String(min).padStart(2, '0')}`;
}

const dollPredicate = (t, filter) => (doll) => {
  if (filter.rank.length > 0) {
    if (!filter.rank.includes(String(doll.rank.id))) { return false; }
  }

  if (filter.type.length > 0) {
    if (!filter.type.includes(doll.type)) { return false; }
  }

  if (filter.name.length > 0) {
    return filter.name.reduce((result, query) => {
      if (result) { return result; }

      if (t(doll.name).toLowerCase().indexOf(query.toLowerCase()) !== -1) { return true; }

      if (buildTime2Str(doll.buildTime).indexOf(query) !== -1) { return true; }

      return doll.alias.reduce((aliasResult, alias) => {
        if (aliasResult) { return aliasResult; }

        if (alias.indexOf(query) !== -1) { return true; }

        return false;
      }, false);
    }, false);
  }

  return true;
};

const equipPredicate = (t, filter) => (equip) => {
  if (filter.rank.length > 0) {
    if (!filter.rank.includes(String(equip.rank))) { return false; }
  }

  if (filter.name.length > 0) {
    return filter.name.reduce((result, query) => {
      if (result) { return result; }

      if (t(equip.name).indexOf(query) !== -1) { return true; }

      if (buildTime2Str(equip.buildTime).indexOf(query) !== -1) { return true; }

      return equip.alias.reduce((aliasResult, alias) => {
        if (aliasResult) { return aliasResult; }

        if (alias.indexOf(query) !== -1) { return true; }

        return false;
      }, false);
    }, false);
  }

  return true;
};

export default {
  dollPredicate,
  equipPredicate,
};
