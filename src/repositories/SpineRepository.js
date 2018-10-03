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

function hit(dollCode, skinCode) {
  if (!(dollCode in cache)) {
    cache[dollCode] = {};
  }

  return (skinCode in cache[dollCode]);
}

async function fetchSpine(dollId, skinCode) {
  const dollSpine = getDollSpine(dollId);

  const dollCode = dollSpine.code;

  if (!hit(dollCode, skinCode)) {
    const exts = dollSpine.names[skinCode];
    const getName = ext => [dollCode, skinCode, ext].join('-');

    exts.forEach((ext) => {
      loader.add(getName(ext), getSpineResourceUrl(dollCode, skinCode, ext), xhrTypeMap[ext]);
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
    // cache[dollCode][skinCode] = spineJsonParser.readSkeletonData(rawSkel, name); // name 어디서나온놈이여
    cache[dollCode][skinCode] = spineJsonParser.readSkeletonData(rawSkel);
  }

  return cache[dollCode][skinCode];
}

async function fetchDefaultSpine(dollId) {
  const skeleton = await fetchSpine(dollId, 0);
  return skeleton;
}

export default { fetchSpine, fetchDefaultSpine };
