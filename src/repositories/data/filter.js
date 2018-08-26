import dolls from './doll';
import dollTypes from './dollType';
import dollRanks from './dollRank';

const properties = [];
dollTypes.forEach((e) => {
  const predicate = doll => doll.type === e;
  properties.push([e.code.toUpperCase(), predicate]);
});
dollRanks.forEach((e) => {
  const predicate = doll => doll.rank === e;
  e.nickNames.forEach(nick => properties.push([nick, predicate]));
});

const names = dolls.reduce((arr, e) => {
  if (e.id < 20000) {
    const ids = [e.id];

    if (dolls.find(iter => iter.id === e.id + 20000)) {
      ids.push(e.id + 20000);
    }
    arr.push([e.name, ids]);
    arr.push([e.krName, ids]);
    if (e.nicknames) e.nicknames.forEach(nick => arr.push([nick, ids]));
  }
  return arr;
}, []);

export const propertyFilter = new Map(properties);
export const nameFilter = new Map(names);
