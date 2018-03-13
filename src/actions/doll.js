export const MOUNT = 'MOUNT';
export const SET_IMG_NO = 'SET_IMG_NO';
export const TOGGLE_IMG_TYPE = 'TOGGLE_IMG_TYPE';
export const SET_SKILL_LV = 'SELECT_SKILL_LV';

export function mount(id) {
  return {
    type: MOUNT,
    id,
  };
}

export function setImgNo(no) {
  return {
    type: SET_IMG_NO,
    no,
  };
}

export function toggleImgType() {
  return {
    type: TOGGLE_IMG_TYPE,
  };
}

export function setSkillLv(lv) {
  return {
    type: SET_SKILL_LV,
    lv,
  };
}
