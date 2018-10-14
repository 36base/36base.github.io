
import https from 'https';
import DollRepository from '../../repositories/DollRepository';
import { getSpineResourceUrl } from '../url';

const isSuccess = (statusCode) => {
  const statusCodeHead = parseInt(statusCode / 100, 10);

  return (statusCodeHead === 2 || statusCodeHead === 3);
};

test('Doll Spine Request Test', (done) => {
  const httpRequestIsFailed = url => new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (isSuccess(response.statusCode)) resolve();
      else reject(new Error(`${url} failed`));
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
