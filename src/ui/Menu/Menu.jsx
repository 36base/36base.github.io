import React from 'react';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [
        {
          name: '소녀전선 도감',
          children: [
            {
              name: '전술인형 도감',
            },
            {
              name: '전술요정 도감',
            },
            {
              name: '인형장비 도감',
            },
          ],
        },
        {
          name: '기타 편의기능',
          children: [
            {
              name: '작전보고서 계산기',
            },
            {
              name: 'SD 시뮬레이터',
            },
          ],
        },
        {
          name: 'About/Contact',
        },
      ],
    };

    this.renderItem = this.renderItem.bind(this);
  }

  renderSubItem(item) {
    return (
      <li>{item.name}</li>
    );
  }

  renderItem(item) {
    const subItems = item.children && item.children.map(this.renderSubItem);
    return (
      <li>
        {item.name}
        {subItems}
      </li>
    );
  }

  render() {
    return (
      <div className="menu-list">
        <ul>
          {
            this.state.menus.map(this.renderItem)}
        </ul>
      </div>
    );
  }
}
