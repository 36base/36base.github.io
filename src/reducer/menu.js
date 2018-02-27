import { RESET_MENU, TOGGLE_MENU } from '../actions/menu';

const menuList =  {
  dic: { id: 'dic', name: '소녀전선 도감', type: 'menu-item', icon: 'fa-book', children: ['doll', 'fairy', 'equip']},
  util: { id: 'util', name: '기타 편의기능', type: 'menu-item', icon: 'fa-archive', children: ['calculator', 'sdsim']},
  about: { id: 'about', name: 'About/content', type: 'menu-item', icon: 'fa-question-circle', link: '/about'},
  doll: { id: 'doll', name: '전술인형 도감', type: 'menu-subitem', link: '/doll' },
  fairy: { id: 'fairy', name: '전술요정 도감', type: 'menu-subitem', link: '/fairy' },
  equip: { id: 'equip', name: '인형장비 도감', type: 'menu-subitem', link: '/equip' },
  calculator: { id: 'calculator', name: '작전보고서 계산기', type: 'menu-subitem', link: '/calculator' },
  sdsim: { id: 'sdsim', name: 'SD 시뮬레이터', type: 'menu-subitem', link: '/sdsim' },
};

function getInitialMenus() {
  return screen.width < 767 ? [] : [menuList.dic, menuList.util, menuList.about];
};

const initialState = {
  menus: getInitialMenus()
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case RESET_MENU:
      return Object.assign({}, state, {
        menus: getInitialMenus(),
      });
    case TOGGLE_MENU:
      const menus = state.menus.slice();
      const target = menuList[action.id];
      const idx = menus.findIndex((e) => e.id === target.id) + 1;

      if (target.expanded) {
        target.expanded = false;
        menus.splice(idx, target.children.length);
      } else {
        target.expanded = true;
        const children = target.children.map((childId) => menuList[childId]);
        menus.splice(idx, 0, ...children);
      }
      return Object.assign({}, state, {menus});
    default:
      return state;
  }
};

export default reducer;
