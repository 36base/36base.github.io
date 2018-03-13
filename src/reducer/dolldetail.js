import dollData from '../repositories/doll';
import { MOUNT, SET_IMG_NO, TOGGLE_IMG_TYPE, SET_SKILL_LV } from '../actions/dolldetail';

const dollMap = new Map(dollData.map(e => [e.id, e]));

const initialState = {
  id: 0,
  imgNo: 0,
  skillLv: 10,
  imgDamaged: false,

  mounted: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MOUNT:
      return Object.assign({}, state, {
        id: action.id,
        mounted: dollMap.get(action.id),
      });
    case SET_IMG_NO:
      return Object.assign({}, state, {
        imgNo: action.no,
      });
    case TOGGLE_IMG_TYPE:
      return Object.assign({}, state, {
        imgDamaged: !state.imgDamaged,
      });
    case SET_SKILL_LV:
      return Object.assign({}, state, {
        skillLv: action.lv,
      });
    default:
      return state;
  }
};

export default reducer;
