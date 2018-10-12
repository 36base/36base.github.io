
import https from 'https';
import DollRepository from '../../repositories/DollRepository';
import { getSpineResourceUrl } from '../url';

test('Doll Spine Request Test', (done) => {
  const httpRequestIsFailed = url => new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) resolve();
      else if (response.statusCode === 404) reject(new Error(`${url} failed`));
    });
  });

  const dolls = DollRepository.getAll();
  const spinePromises = dolls.reduce((promises, doll) => {
    const { codename, skins } = doll;

    skins.forEach((skin) => {
      const { id: skinId } = skin;
      promises.push(...[
        httpRequestIsFailed(getSpineResourceUrl(codename, true, skinId, 'skel')),
        httpRequestIsFailed(getSpineResourceUrl(codename, false, skinId, 'skel')),
        httpRequestIsFailed(getSpineResourceUrl(codename, false, skinId, 'atlas')),
        httpRequestIsFailed(getSpineResourceUrl(codename, false, skinId, 'png')),
      ]);
    });

    return promises;
  }, []);

  /*
  spinePromises.forEach((promise) => {
    promise.catch(err => console.log(err.message));
  });
  */

  Promise.all(spinePromises)
    .then(() => done())
    .catch((e) => {
      console.log(e);
    });
}, 20000);
