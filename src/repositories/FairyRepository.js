import { fairies } from 'girlsfrontline-core';
import Fairy from 'girlsfrontline-core/lib/fairy';

const buildData = fairy => Object.assign(
  fairy,
  {
    buildTime: (
      fairy.id > 1000
      || fairy.id === 18
      || fairy.id === 19
      || fairy.id === 20
    ) ? 0 : fairy.buildTime,
  },
);

const getAll = () => fairies.map(fairy => buildData(new Fairy(fairy.toJSON())));

const getNewById = id => buildData(new Fairy(fairies.find(fairy => fairy.id === id).toJSON()));

export default { getAll, getNewById };
