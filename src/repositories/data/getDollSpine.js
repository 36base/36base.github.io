
import { dolls } from 'girlsfrontline-core';

const getDollSpine = (dollId) => {
  const doll = dolls.find(item => item.id === dollId);
  const lowerDollName = String(doll.name).toLowerCase();
  const dollSpine = {
    code: lowerDollName,
    names: { },
  };
  dollSpine.names[lowerDollName] = ['png', 'atlas', 'skel'];
  Object.keys(doll.skins).forEach((key) => {
    dollSpine.names[`${lowerDollName}_${key}`] = ['png', 'atlas', 'skel'];
  });

  return dollSpine;
};

export default getDollSpine;
