import React from 'react';

import './style/Menu.css';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [
        {
          id: 'dic',
          name: '소녀전선 도감',
          icon: 'fa-book',
          expanded: false,
          children: [
            { id: 'dic-doll', name: '전술인형 도감' },
            { id: 'dic-fairy', name: '전술요정 도감' },
            { id: 'dic-equip', name: '인형장비 도감' },
          ],
        },
        {
          id: 'util',
          name: '기타 편의기능',
          icon: 'fa-archive',
          expanded: false,
          children: [
            { id: 'util-expcalc', name: '작전보고서 계산기' },
            { id: 'util-sdsimul', name: 'SD 시뮬레이터' },
          ],
        },
        {
          id: 'contact',
          name: 'About/Contact',
          icon: 'fa-question-circle',
        },
      ],
    };

    this.renderItem = this.renderItem.bind(this);
    this.toggle = this.toggle.bind(this);
    this.route = this.route.bind(this);
  }

  toggle(id) {
    const { menus } = this.state;
    const idx = menus.findIndex((menu) => menu.id === id);
    const { expanded } = menus[idx];

    menus[idx].expanded = !expanded;

    this.setState({
      menus: menus,
    });
  }

  route(id) {
    console.log(id);
  }

  renderItem(item) {
    const key = `menu-${item.id}`;
    const className = `undraggable menu-item expandable ${item.expanded ? 'expanded' : ''}`;

    return (
      <li key={key} className={className} onClick={() => this.toggle(item.id)}>
        {item.icon && <i className={`fa fa-lg ${item.icon}`} />}
        {item.name}
      </li>
    );
  }

  renderSubitem(item) {
    const key = `menu-${item.id}`;
    const className = 'undraggable menu-subitem';

    return (
      <li key={key} className={className} onClick={() => this.route(item.id)}>
        {item.icon && <i className={`fa fa-lg ${item.icon}`} />}
        {item.name}
      </li>
    );
  }

  render() {
    const { menus } = this.state;
    const items = [];

    for (const menu of menus) {
      items.push(this.renderItem(menu));

      if (menu.children && menu.children.length > 0 && menu.expanded) {
        for (const submenu of menu.children) {
          items.push(this.renderSubitem(submenu));
        }
      }
    }

    return (
      <nav id="menu">
        <ul>
          <li className="undraggable menu-item title">36베이스</li>
          {items}
        </ul>
      </nav>
    );
  }
}
