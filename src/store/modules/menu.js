import { createAction, handleActions } from 'redux-actions';

export const toggleMobile = createAction('TOGGLE_MOBILE');
export const expand = createAction('EXPAND');

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
        logisticsupport: { name: 'Logistic support', icon: 'fa-industry', to: '/logisticsupport' },
        musicplayer: { name: 'Music Player', icon: 'fa-music', to: '/musicplayer' },
        gfdict: {
          name: 'Gf dict',
          icon: 'fa-book',
          to: '/gfdict',
          fitLanguage: ['ko-KR'],
        },
      },
    },
  },
};

export default handleActions(
  {
    TOGGLE_MOBILE: state => ({
      ...state,
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
    }),
    EXPAND: (state, { payload: id }) => {
      const { list } = state;
      return {
        ...state,
        list: {
          ...list,
          [id]: {
            ...list[id],
            opened: !list[id].opened,
          },
        },
      };
    },
  },
  initialState,
);
