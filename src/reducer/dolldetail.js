import dollData from './data/doll';
import skillData from '../resources/data/skill';
import { SELECT_ID, SELECT_IMG, TOGGLE_IMG_TYPE, SELECT_SKILL_LV } from '../actions/doll';

const initialState = {
  id: undefined,
  imgIdx: 0,
  imgType: 'normal',
  lv: 100,
  skill: {},

  info: {},
};

function getDollInfo(dollId) {
  const dollInfo = dollData.get(dollId);
  const skill = skillData[dollInfo.skill.id];

  return {
    id: dollId,
    name: dollInfo.krName,
    type: dollInfo.type,
    rank: dollInfo.rank,
    voice: dollInfo.voice,
    image: {
      idx: 0,
      type: 'normal',
      values: dollInfo.images,
    },
    stats: { ...dollInfo.stats },
    skill: {
      id: skill.id,
      name: skill.name,
      lv: 10,
      icon: require(`../resources/images/skill/${skill.path}.png`),
      template: skill.desc,
      initCooldown: dollInfo.skill.initCooldown,
      dataPool: new Map(skill.data.map(d => (
        [d.key, { ...d, values: dollInfo.skill.dataPool[d.key] }]
      ))),
    },
    effect: dollInfo.effect,
    acquisition: {
      build: dollInfo.buildTime,
      storyDrop: dollInfo.drop,
      eventDrop: [],
    },
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_ID:
      return Object.assign({}, state, getDollInfo(action.id));
    case SELECT_IMG:
      return Object.assign({}, state, {
        ...state,
        image: {
          ...state.image,
          idx: action.id,
        },
      });
    case TOGGLE_IMG_TYPE:
      return Object.assign({}, state, {
        ...state,
        image: {
          ...state.image,
          type: state.image.type === 'normal' ? 'damaged' : 'normal',
        },
      });
    case SELECT_SKILL_LV:
      return Object.assign({}, state, {
        ...state,
        skill: {
          ...state.skill,
          lv: action.lv,
        },
      });
    default:
      return state;
  }
};

export default reducer;
