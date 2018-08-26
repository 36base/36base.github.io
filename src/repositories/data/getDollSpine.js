
import { dolls } from 'girlsfrontline-core';

const getDollSpine = (dollId) => {
  const doll = dolls.find(item => item.id === dollId);
  const dollSpine = {
    code: doll.name,
    names: { },
  };
  dollSpine.names[doll.name] = ['png', 'atlas', 'skel'];
  Object.keys(doll.skins).forEach((key) => {
    dollSpine.names[`${doll.name}_${key}`] = ['png', 'atlas', 'skel'];
  });

  return dollSpine;
};

export default getDollSpine;
