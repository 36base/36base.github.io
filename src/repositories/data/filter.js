import DollRepository from '../DollRepository';
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

const buildTimeToString = (time) => {
  const hour = `${Number.parseInt(time / 3600, 10)}`;
  const min = `${Number.parseInt((time % 3600) / 60, 10)}`;

  return `${hour.padStart(2, '0')}${min.padStart(2, '0')}`;
};

const dolls = [];

DollRepository.fetchAll()
  .then(data => data.forEach(item => dolls.push(item)));

const names = dolls.reduce((arr, e) => {
  if (e.id < 20000) {
    const ids = [e.id];

    if (dolls.find(iter => iter.id === e.id + 20000)) {
      ids.push(e.id + 20000);
    }
    arr.push([String(e.name).toLowerCase(), ids]);
    if (e.nicknames) e.nicknames.forEach(nick => arr.push([String(nick).toLowerCase(), ids]));
    arr.push([`${buildTimeToString(e.buildTime)} - ${e.name}`, ids]);
  }
  return arr;
}, []);

export const propertyFilter = new Map(properties);
export const nameFilter = new Map(names);
