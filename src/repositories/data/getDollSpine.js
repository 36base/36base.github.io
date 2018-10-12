
import DollRepository from '../DollRepository';

const getDollSpine = (dollId) => {
  const doll = DollRepository.getNewById(dollId);
  const { id, codename, skins } = doll;

  const dollSpine = {
    code: codename,
    names: { },
  };
  dollSpine.names[0] = ['png', 'atlas', 'skel'];
  if (skins && id < 20000) {
    skins.forEach((skin) => {
      dollSpine.names[skin.id] = ['png', 'atlas', 'skel'];
    });
  }

  return dollSpine;
};

export default getDollSpine;
