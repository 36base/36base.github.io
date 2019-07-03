import { createAction, handleActions } from 'redux-actions';

export const toggleMobile = createAction('TOGGLE_MOBILE');
export const expand = createAction('EXPAND');

const initialState = {
  openMobile: false,
  list: [
    {
      id: 'dic',
      name: 'Gf Dictionary',
      icon: 'fa-book',
      opened: false,
      children: {
        doll: { name: 'Doll Dictionary', icon: 'fa-address-book', to: '/doll' },
        eqip: { name: 'Equipment Dictionary', icon: 'fa-cogs', to: '/equip' },
        fairy: { name: 'Fairy Dictionary', icon: 'fa-street-view', to: '/fairy' },
      },
    },
    {
      id: 'util',
      name: 'Convenience Features',
      icon: 'fa-archive',
      opened: false,
      children: {
        timetable: { name: 'Time Table', icon: 'fa-clock', to: '/timetable' },
        calculator: { name: 'Disc Calculator', icon: 'fa-calculator', to: '/calculator' },
        sdsim: { name: 'SD Simulator', icon: 'fa-industry', to: '/sdsim' },
        logisticsupport: { name: 'Logistic Support', icon: 'fa-industry', to: '/logisticsupport' },
        musicplayer: { name: 'Music Player', icon: 'fa-music', to: '/musicplayer' },
        gfdict: {
          name: 'Gf Dict',
          icon: 'fa-book',
          to: '/gfdict',
          fitLanguage: ['ko-KR'],
        },
        guide: { name: 'Guide', icon: 'fa-book', to: '/guide' },
      },
    },
  ],
};

export default handleActions(
  {
    TOGGLE_MOBILE: (state) => {
      const { list } = state;

      return ({
        ...state,
        openMobile: !state.openMobile,
        list: list.map(menu => ({
          ...menu,
          opened: false,
        })),
      });
    },
    EXPAND: (state, { payload: id }) => {
      const { list } = state;
      return {
        ...state,
        list: list.map((menu) => {
          if (menu.id === id) {
            return {
              ...menu,
              opened: !menu.opened,
            };
          }
          return { ...menu };
        }),
      };
    },
  },
  initialState,
);
