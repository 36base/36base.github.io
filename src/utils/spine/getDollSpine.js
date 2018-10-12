
import DollRepository from '../../repositories/DollRepository';

const getDollSpine = (dollId) => {
  const doll = DollRepository.getNewById(dollId);
  const { codename, skins } = doll;

  const dollSpine = {
    code: codename,
    names: { },
  };
  dollSpine.names[0] = ['png', 'atlas', 'skel']; // set default skin spine
  if (skins) {
    skins.forEach((skin) => {
      dollSpine.names[skin.id] = ['png', 'atlas', 'skel'];
    });
  }

  return dollSpine;
};

export default getDollSpine;
