
import https from 'https';
import DollRepository from './DollRepository';
import { getSpineResourceUrl } from '../utils/url';

test('Doll Spine Request Test', (done) => {
  const httpRequestIsFailed = url => new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) resolve();
      else if (response.statusCode === 404) reject(new Error(`${url} failed`));
    });
  });

  const dolls = DollRepository.getAll();
  const spinePromises = dolls.reduce((promises, doll) => {
    const { id, spinecodename, skins } = doll;

    if (id < 20000 // 개장 거름 (5000 번대 스킨 들어가있음)
      && id !== 95 // 한양조 거름 (스킨 하나가 라투디만들감)
      && id !== 98 // 물로리 1703 skel 만 Spp1, 나머진 SPP1
      && id !== 101 // 움뀨 (2106 스킨만 UMP9 고 나머진 ump9 임)
    ) {
      skins.forEach((skin) => {
        const { id: skinId } = skin;
        promises.push(...[
          httpRequestIsFailed(getSpineResourceUrl(spinecodename, true, skinId, 'skel').toString()),
          httpRequestIsFailed(getSpineResourceUrl(spinecodename, false, skinId, 'skel').toString()),
          httpRequestIsFailed(getSpineResourceUrl(spinecodename, false, skinId, 'atlas').toString()),
          httpRequestIsFailed(getSpineResourceUrl(spinecodename, false, skinId, 'png').toString()),
        ]);
      });
    }
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
