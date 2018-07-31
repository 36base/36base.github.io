import { TOGGLE_MOBILE, EXPAND } from '../actions/menu';

const initialState = {
  openMobile: false,
  list: {
    dic: {
      name: 'gf dictionary',
      icon: 'fa-book',
      opened: false,
      children: {
        doll: { name: 'doll dictionary', icon: 'fa-address-book', to: '/doll' },
        eqip: { name: 'equipment dictionary', icon: 'fa-cogs', to: '/equip' },
        fairy: { name: 'fairy dictionary', icon: 'fa-street-view', to: '/fairy' },
      },
    },
    util: {
      name: 'Convenience Features',
      icon: 'fa-archive',
      opened: false,
      children: {
        timetable: { name: 'time table', icon: 'fa-clock', to: '/timetable' },
        calculator: { name: 'Disc calculator', icon: 'fa-calculator', to: '/calculator' },
        sdsim: { name: 'SD simulator', icon: 'fa-industry', to: '/sdsim' },
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
