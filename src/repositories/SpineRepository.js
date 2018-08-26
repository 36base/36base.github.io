import * as PIXI from 'pixi.js';
import spine from 'pixi-spine';
import SkeletonBinary from '../utils/SkeletonBinary';
import getDollSpine from './data/getDollSpine';

const domain = 'https://girlsfrontline.kr/hotlink-ok/girlsfrontline-resources/spine/';
// const domain = 'http://127.0.0.1:8887/spine/';
const loader = new PIXI.loaders.Loader(domain);
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

async function fetchSpine(dollId, skinNo) {
  const dollSpine = getDollSpine(dollId);

  if (!dollSpine) {
    throw Error(`No spine are defined for ${dollId}`);
  }

  if (skinNo >= dollSpine.names) {
    throw Error(`No spine are defined for ${dollId}, ${skinNo}`);
  }

  const dollCode = dollSpine.code;
  const skinCode = Object.keys(dollSpine.names)[skinNo];

  if (!hit(dollCode, skinCode)) {
    const exts = dollSpine.names[skinCode];
    const getName = ext => [dollCode, skinCode, ext].join('-');
    const getPath = ext => `${dollCode}/${skinCode}.${ext}${ext === 'png' ? '' : '.txt'}`;

    exts.forEach((ext) => {
      loader.add(getName(ext), getPath(ext), xhrTypeMap[ext]);
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
    cache[dollCode][skinCode] = spineJsonParser.readSkeletonData(rawSkel, name);
  }

  return cache[dollCode][skinCode];
}

async function fetchDefaultSpine(dollId) {
  const skeleton = await fetchSpine(dollId, 0);
  return skeleton;
}

export default { fetchSpine, fetchDefaultSpine };
