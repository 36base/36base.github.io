import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './style/Menu.css';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: {
        dic: {
          name: '소녀전선 도감',
          icon: 'fa-book',
          children: ['doll', 'fairy', 'equip'],
        },
        util: {
          name: '기타 편의기능',
          icon: 'fa-archive',
          children: ['calculator', 'sdsim'],
        },
        about: {
          name: 'About/content',
          icon: 'fa-question-circle',
          link: '/about',
        },
        doll: { name: '전술인형 도감', link: '/doll' },
        fairy: { name: '전술요정 도감', link: '/fairy' },
        equip: { name: '인형장비 도감', link: '/equip' },
        calculator: { name: '작전보고서 계산기', link: '/calculator' },
        sdsim: { name: 'SD 시뮬레이터', link: '/sdsim' },
      },
      list: ['dic', 'util', 'about'],
    };

    this.renderItem = this.renderItem.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle(id) {
    const { menus } = this.state;
    const expanded = menus[id].expanded || false;

    menus[id].expanded = !expanded;

    this.setState({
      menus,
    });
  }

  renderItem(id, level) {
    const menu = this.state.menus[id];

    const key = `menu-${id}`;
    const type = level === 0 ? 'menu-item' : 'menu-subitem';
    const expandable = menu.children && menu.children.length > 0 ? 'expandable' : '';

    const className = `undraggable ${type} ${expandable}`;
    const onClick = expandable ? () => this.toggle(id) : null;

    const item = menu.link ?
      (
        <li key={key} className={className}>
          <Link to={menu.link}>{menu.icon && <i className={`fa fa-lg ${menu.icon}`} />}{menu.name}</Link>
        </li>
      )
      :
      (
        <li key={key} className={className} onClick={onClick} aria-hidden>
          {menu.icon && <i className={`fa fa-lg ${menu.icon}`} />}
          {menu.name}
        </li>
      );

    const children = menu.expanded ? menu.children.map(child => this.renderItem(child, 1)) : [];

    return [item, ...children];
  }

  render() {
    const { list } = this.state;

    return (
      <nav id="menu">
        <ul>
          <li className="undraggable menu-item title">
            <Link to="/">36베이스</Link>
          </li>
          {list.map(e => this.renderItem(e, 0))}
        </ul>
      </nav>
    );
  }
}

export default Menu;
