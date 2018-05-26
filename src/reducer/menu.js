import { TOGGLE_MOBILE, EXPAND } from '../actions/menu';

const initialState = {
  openMobile: false,
  list: {
    dic: {
      name: '소녀전선 도감',
      icon: 'fa-book',
      opened: false,
      children: {
        doll: { name: '전술인형 도감', icon: 'fa-address-book', to: '/doll' },
        eqip: { name: '인형장비 도감', icon: 'fa-cogs', to: '/equip' },
        fairy: { name: '전술요정 도감', icon: 'fa-street-view', to: '/fairy' },
      },
    },
    util: {
      name: '기타 편의기능',
      icon: 'fa-archive',
      opened: false,
      children: {
        timetable: { name: '제조 시간표', icon: 'fa-clock', to: '/timetable' },
        calculator: { name: '작전보고서 계산기', icon: 'fa-calculator', to: '/calculator' },
        sdsim: { name: 'SD 시뮬레이터', icon: 'fa-industry', to: '/sdsim' },
      },
    },
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MOBILE:
      return Object.assign({}, state, {
        openMobile: !state.openMobile,
        list: {
          dic: {
            ...state.list.dic,
            opened: false,
          },
          util: {
            ...state.list.util,
            opened: false,
          },
        },
      });
    case EXPAND:
      return Object.assign({}, state, {
        ...state,
        list: {
          ...state.list,
          [action.id]: {
            ...state.list[action.id],
            opened: !state.list[action.id].opened,
          },
        },
      });
    default:
      return state;
  }
};

export default reducer;
