import * as PIXI from 'pixi.js';
import spine from 'pixi-spine';
import SkeletonBinary from './SkeletonBinary';

import { getSpineResourceUrl } from '../url';

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

export async function loadSpine(name, { atlas, png, skel }) {
  const resourceUrl = { atlas, png, skel };

  const getName = ext => [name, ext].join('-');

  loader.reset();
  Object.entries(resourceUrl).forEach(([ext, url]) => {
    loader.add(
      getName(ext),
      url,
      xhrTypeMap[ext],
    );
  });

  const resources = await new Promise(resolve => loader.load((_, res) => resolve(res)));
  Object.values(resources).forEach((resource) => {
    const { error } = resource;
    if (error) {
      throw new Error(error.message);
    }
  });

  const rawSkel = getSkelJson(resources[getName('skel')].data);
  const rawAtlas = resources[getName('atlas')].data;
  const rawPng = resources[getName('png')].data;

  const spineAtlas = new spine.SpineRuntime.Atlas(rawAtlas, (line, callback) => {
    callback(new PIXI.BaseTexture(rawPng));
  });
  const spineAtlasParser = new spine.SpineRuntime.AtlasAttachmentParser(spineAtlas);
  const spineJsonParser = new spine.SpineRuntime.SkeletonJsonParser(spineAtlasParser);

  return spineJsonParser.readSkeletonData(rawSkel);
}

export async function loadDollSpine(codename, skinId, type) {
  const spineName = `${codename}-${type}`;
  if (cache[spineName]) {
    return cache[spineName];
  }

  const resourceUrl = {};
  ['atlas', 'png', 'skel'].forEach((ext) => {
    resourceUrl[ext] = getSpineResourceUrl(codename, type, skinId, ext);
  });

  let spineData = null;
  try {
    spineData = await loadSpine(spineName, resourceUrl);
  } catch (error) {
    resourceUrl.atlas = getSpineResourceUrl(codename, 'battle', skinId, 'atlas');
    resourceUrl.png = getSpineResourceUrl(codename, 'battle', skinId, 'png');
    spineData = await loadSpine(spineName, resourceUrl);
  }

  cache[spineName] = spineData;
  return spineData;
}
