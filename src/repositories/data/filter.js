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
  arr.push([e.name, e.id]);
  arr.push([e.krName, e.id]);
  if (e.nicknames) e.nicknames.forEach(nick => arr.push([nick, e.id]));
  return arr;
}, []);


export const propertyFilter = new Map(properties);
export const nameFilter = new Map(names);
