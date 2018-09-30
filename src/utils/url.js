import { getResourceHost } from './host';

export function getDollResourceUrl(codename, type, { skin = null } = {}) {
  const modExp = /Mod$/gi;
  const mod = modExp.test(codename);
  let resourceName = mod && skin
    ? `pic_${codename.replace(modExp, '')}`
    : `pic_${codename}`;
  resourceName += skin ? `_${skin}` : '';
  switch (type) {
    case 'normal':
      resourceName += '';
      break;
    case 'damaged':
      resourceName += '_D';
      break;
    case 'portrait':
      resourceName += mod && skin ? '_N_mod' : '_N';
      break;
    default:
      throw Error(`unexpected resource type: ${type}`);
  }

  return `${getResourceHost()}pic/${resourceName}.png`;
}

export function getDollTypeIconUrl(type, rank) {
  return `${getResourceHost()}typeicons/gun/${type.toUpperCase()}${rank}.png`;
}

export function getFairyResourceUrl(codename) {
  return `${getResourceHost()}fairy/${codename}.png`;
}

export function getFairyTypeIconUrl(type) {
  return `${getResourceHost()}typeicons/fairy/${type}.png`;
}

export function getSkillIconUrl(codename) {
  return `${getResourceHost()}icon/skillicon/${codename}.png`;
}

export function getEquipIconUrl(codename) {
  return `${getResourceHost()}icon/equip/${codename}.png`;
}

export function getSpineResourceUrl(codename, skinId) {
  const resourceName = skinId ? `${codename}_${skinId}` : codename;
  const exts = ['png', 'skel', 'atlas'];

  const url = `${getResourceHost()}spine/${resourceName.toLowerCase()}/${resourceName}`;

  return exts.map(ext => `${url}.${ext}`);
}
