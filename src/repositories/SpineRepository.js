import * as PIXI from 'pixi.js';
import spine from 'pixi-spine';
import SkeletonBinary from '../utils/spine/SkeletonBinary';
import getDollSpine from './data/getDollSpine';

import { getSpineResourceUrl } from '../utils/url';

const loader = new PIXI.loaders.Loader();
const cache = {};
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

function hit(dollCode, skinCode, type) {
  if (!(dollCode in cache)) {
    cache[dollCode] = {
      battle: { },
      stay: { },
    };
  }

  return (skinCode in (cache[dollCode][type]));
}

async function fetchSpine(dollId, skinCode, isStaying = false) {
  const dollSpine = getDollSpine(dollId);

  const dollCode = dollSpine.code;
  const type = isStaying ? 'stay' : 'battle';

  if (!hit(dollCode, skinCode, type)) {
    const exts = dollSpine.names[skinCode];
    const getName = ext => [dollCode, type, skinCode, ext].join('-');

    exts.forEach((ext) => {
      loader.add(
        getName(ext),
        getSpineResourceUrl(dollCode, isStaying, skinCode, ext),
        xhrTypeMap[ext],
      );
    });

    let resource = await new Promise(resolve => loader.load((_, res) => resolve(res)));

    // 숙소 모델이 atlas, png 는 전투용 리소스를 사용하는 경우가 있음
    if (isStaying && resource[getName('atlas')].error) {
      loader.destroy(true);
      exts.forEach((ext) => {
        loader.add(
          getName(ext),
          getSpineResourceUrl(dollCode, ext === 'skel', skinCode, ext),
          xhrTypeMap[ext],
        );
      });
      resource = await new Promise(resolve => loader.load((_, res) => resolve(res)));
    }
    loader.destroy(true);

    exts.forEach((ext) => {
      const { error } = resource[getName(ext)];
      if (error) {
        throw error.message;
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

    cache[dollCode][type][skinCode] = spineJsonParser.readSkeletonData(rawSkel);
  }

  return cache[dollCode][type][skinCode];
}

async function fetchDefaultSpine(dollId) {
  const skeleton = await fetchSpine(dollId, 0);
  return skeleton;
}

export default { fetchSpine, fetchDefaultSpine };
