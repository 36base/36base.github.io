import * as PIXI from 'pixi.js';
import spine from 'pixi-spine';
import SkeletonBinary from './SkeletonBinary';
import getDollSpine from './getDollSpine';

import { getSpineResourceUrl } from '../url';
import { request, isRequestSuccess } from '../httpRequest';

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

async function loadSpine(dollId, skinCode, type) {
  const dollSpine = getDollSpine(dollId);

  const dollCode = dollSpine.code;

  if (!hit(dollCode, skinCode, type)) {
    const exts = dollSpine.names[skinCode];
    const getName = ext => [dollCode, type, skinCode, ext].join('-');

    const resourceUrl = {
      atlas: getSpineResourceUrl(dollCode, type, skinCode, 'atlas'),
      png: getSpineResourceUrl(dollCode, type, skinCode, 'png'),
      skel: getSpineResourceUrl(dollCode, type, skinCode, 'skel'),
    };

    if (type !== 'battle') {
      // 전투: 'battle', 숙소: 'stay'
      // 숙소 SD 데이터중 숙소버전 atlas 와 png 가 따로 없고 전투용과 공유하는 경우가 있기에, 해당 경우 처리 (파일 존재 여부 확인)
      const response = { atlas: null, png: null, skel: null };
      response.atlas = await request('GET', getSpineResourceUrl(dollCode, 'stay', skinCode, 'atlas'));
      response.png = await request('GET', getSpineResourceUrl(dollCode, 'stay', skinCode, 'png'));
      response.skel = await request('GET', getSpineResourceUrl(dollCode, 'stay', skinCode, 'skel'));

      if (!(isRequestSuccess(response.atlas)
        && isRequestSuccess(response.png)
        && isRequestSuccess(response.skel)
      )) {
        resourceUrl.atlas = getSpineResourceUrl(dollCode, 'battle', skinCode, 'atlas');
        resourceUrl.png = getSpineResourceUrl(dollCode, 'battle', skinCode, 'png');
      }
    }

    loader.reset();
    exts.forEach((ext) => {
      loader.add(
        getName(ext),
        resourceUrl[ext],
        xhrTypeMap[ext],
      );
    });

    const resource = await new Promise(resolve => loader.load((_, res) => resolve(res)));

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

export default { loadSpine };
