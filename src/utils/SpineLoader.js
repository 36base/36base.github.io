import * as PIXI from 'pixi.js';
import spine from 'pixi-spine';
import SkeletonBinary from './SkeletonBinary';

import dollSpines from '../repositories/data/dollSpines';

const domain = 'https://girlsfrontline.kr/hotlink-ok/girlsfrontline-resources/spine/';
const loader = new PIXI.loaders.Loader(domain);
const cache = {};
const spineMap = new Map(Object.values(dollSpines).map(e => [e.code, e.names]));
const xhrTypeMap = {
  skel: { xhrType: 'arraybuffer' },
  png: { xhrType: 'png' },
  atlas: { xhrType: 'text' },
};

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

  async loadDefaultSpine(dollCode) {
    if (!spineMap.has(dollCode)) {
      throw Error(`Unknown spineCode : ${dollCode}`);
    }

    const skinCode = Object.keys(spineMap.get(dollCode))[0];
    const skeleton = await this.loadSpine(dollCode, skinCode);

    return skeleton;
  }

  async loadSpine(dollCode, skinCode) {
    const exts = spineMap.get(dollCode)[skinCode];

    if (!exts) {
      throw Error(`Unknown spineCode: ${dollCode}, ${skinCode}`);
    }

    if (!this.hit(dollCode, skinCode)) {
      const getName = ext => [dollCode, skinCode, ext].join('-');
      const getPath = ext => `${dollCode}/${skinCode}.${ext}${ext === 'png' ? '' : '.txt'}`;

      exts.forEach((ext) => {
        loader.add(getName(ext), getPath(ext), xhrTypeMap[ext]);
      });

      const resource = await new Promise(resolve => loader.load((_, res) => resolve(res)));

      exts.forEach((ext) => {
        const name = getName(ext);
        if (!(name in resource)) {
          throw Error(`Failed to fetching ${name}`);
        }
      });

      const rawSkel = getSkelJson(resource[getName('skel')].data);
      const rawAtlas = resource[getName('atlas')].data;
      const rawPng = resource[getName('png')].data;

      const spineAtlas = new spine.SpineRuntime.Atlas(rawAtlas, (line, callback) => {
        callback(new PIXI.BaseTexture(rawPng));
      });
      const spineAtlasParser = new spine.SpineRuntime.AtlasAttachmentParser(spineAtlas);
      const spineJsonParser = new spine.SpineRuntime.SkeletonJsonParser(spineAtlasParser);
      cache[dollCode][skinCode] = spineJsonParser.readSkeletonData(rawSkel, name);
    }

    return cache[dollCode][skinCode];
  }
}

export default SpineLoader;
