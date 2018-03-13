export const SELECT_ID = 'SELECT_ID';
export const SELECT_IMG = 'SELECT_IMG';
export const TOGGLE_IMG_TYPE = 'TOGGLE_IMG_TYPE';
export const SELECT_SKILL_LV = 'SELECT_SKILL_LV';

export function selectId(id) {
  return {
    type: SELECT_ID,
    id,
  };
}

export function selectImg(id) {
  return {
    type: SELECT_IMG,
    id,
  };
}

export function toggleImgType() {
  return {
    type: TOGGLE_IMG_TYPE,
  };
}

export function selectSkillLv(lv) {
  return {
    type: SELECT_SKILL_LV,
    lv,
  };
}
