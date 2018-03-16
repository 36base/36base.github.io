import * as PIXI from 'pixi.js';
import spine from 'pixi-spine';
import SkeletonBinary from './SkeletonBinary';

import dollSpines from '../repositories/data/dollSpines';

const domain = 'https://girlsfrontline.kr/hotlink-ok/girlsfrontline-resources/spine/';
const loader = new PIXI.loaders.Loader(domain);
const cache = {};
const spineMap = new Map(Object.values(dollSpines).map(e => [e.genus, e.names]));

function getSkelJson(skelData) {
  const bin = new SkeletonBinary();
  bin.data = new Uint8Array(skelData);
  bin.initJson();
  return bin.json;
}

class SpineLoader {
  hit(dollCode, skinCode) {
    if (!(dollCode in cache)) {
      cache[dollCode] = {};
    }

    return (skinCode in cache[dollCode]);
  }

  async loadSpine(dollCode, skinCode) {
    const genus = dollCode;
    const name = skinCode || Object.keys(spineMap.get(dollCode))[0];

    if (!this.hit(genus, name)) {
      const getName = ext => [genus, name, ext].join('-');
      const getPath = ext => `${genus}/${name}.${ext}${ext === 'png' ? '' : '.txt'}`;

      loader.add(getName('skel'), getPath('skel'), { xhrType: 'arraybuffer' });
      loader.add(getName('atlas'), getPath('atlas'), { xhrType: 'text' });
      loader.add(getName('png'), getPath('png'), { xhrType: 'png' });

      const resource = await new Promise(resolve => loader.load((_, res) => resolve(res)));

      const rawSkel = getSkelJson(resource[getName('skel')].data);
      const rawAtlas = resource[getName('atlas')].data;
      const rawPng = resource[getName('png')].data;

      const spineAtlas = new spine.SpineRuntime.Atlas(rawAtlas, (line, callback) => {
        callback(new PIXI.BaseTexture(rawPng));
      });
      const spineAtlasParser = new spine.SpineRuntime.AtlasAttachmentParser(spineAtlas);
      const spineJsonParser = new spine.SpineRuntime.SkeletonJsonParser(spineAtlasParser);
      cache[genus][name] = spineJsonParser.readSkeletonData(rawSkel, name);
    }

    return cache[genus][name];
  }
}

export default SpineLoader;
