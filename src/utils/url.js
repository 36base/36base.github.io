import { getResourceHost } from './host';
import dollExceptionCodename from './exceptiondata/dollCodename';
import dollExceptionSpineCodename from './exceptiondata/dollSpineCodename';

const makeUrl = str => encodeURI(`${getResourceHost()}${str}`);

export const getDollResourceUrl = (codename, type, { skin = null } = {}) => {
  let resourceCodename = codename;

  if (dollExceptionCodename[codename]) {
    resourceCodename = dollExceptionCodename[codename];
  }

  const modExp = /Mod$/gi;
  const mod = modExp.test(resourceCodename);
  let resourceName = mod && skin
    ? `pic_${resourceCodename.replace(modExp, '')}`
    : `pic_${resourceCodename}`;
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

  return makeUrl(`pic/${resourceName}.png`);
};

export const getDollTypeIconUrl = (type, rank) => makeUrl(`typeicons/gun/${type.toUpperCase()}${rank}.png`);

export const getFairyResourceUrl = codename => makeUrl(`fairy/${codename}.png`);

export const getFairyTypeIconUrl = type => makeUrl(`typeicons/fairy/${type}.png`);

export const getSkillIconUrl = codename => makeUrl(`icon/skillicon/${codename}.png`);

export const getEquipIconUrl = codename => makeUrl(`icon/equip/${codename}.png`);

// ext is 'png' or 'skel' or 'atlas'
export const getSpineResourceUrl = (codename, isStaying, skinId, ext) => {
  let resourceCodename = codename;

  if (dollExceptionSpineCodename[codename]) {
    const matchData = dollExceptionSpineCodename[codename];

    if (matchData[skinId]) {
      if (matchData[skinId].bypass !== undefined) {
        return getSpineResourceUrl(codename, isStaying, matchData[skinId].bypass, ext);
      }

      const type = isStaying ? 'stay' : 'battle';
      if (matchData[skinId][ext] && matchData[skinId][ext][type]) {
        resourceCodename = matchData[skinId][ext][type];
      } else {
        resourceCodename = matchData[skinId].codename || codename;
      }
    } else {
      resourceCodename = matchData.codename || codename;
    }
  }

  const resourceName = skinId ? `${resourceCodename}_${skinId}` : resourceCodename;

  return makeUrl(`spine/${resourceName.toLowerCase()}/${isStaying ? 'R' : ''}${resourceName}.${ext}`);
};
