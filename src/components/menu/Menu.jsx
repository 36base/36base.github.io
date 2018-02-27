import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { resetMenu, toggleMenu } from '../../actions/menu';

import './style/Menu.css';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.renderMenu = this.renderMenu.bind(this);
    this.renderMenuGroup = this.renderMenuGroup.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.props.resetMenu);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.props.resetMenu);
  }

  renderMenu(menu) {
    return menu.children ? this.renderMenuGroup(menu) : this.renderLinkItem(menu);
  }

  renderMenuGroup(menu) {
    const className = `undraggable ${menu.type} expandable`;
    const onClick = () => this.props.toggleMenu(menu.id);

    return (
      <li key={menu.id} className={className} onClick={onClick}>
          {menu.icon && <i className={`fa fa-lg ${menu.icon}`} />}
          {menu.name}
      </li>
    );
  }

  renderLinkItem(menu) {
    const className = `undraggable ${menu.type}`;

    return (
      <li key={menu.id} className={className}>
        <Link to={menu.link}>
          {menu.icon && <i className={`fa fa-lg ${menu.icon}`} />}
          {menu.name}
        </Link>
      </li>
    );
  }

  render() {
    return (
      <nav id="menu">
        <ul>
          <li className="undraggable menu-item title">
            <Link to="/">36베이스</Link>
          </li>
          {this.props.menus.map(this.renderMenu)}
        </ul>
      </nav>
    );
  }
}

let stateMapper = (state) => {
  return {
    menus: state.menu.menus
  };
};

let dispatchMapper = (dispatch) => {
  return {
    resetMenu: () => dispatch(resetMenu()),
    toggleMenu: (id) => dispatch(toggleMenu(id)),
  };
}

Menu = connect(stateMapper, dispatchMapper)(Menu);

export default Menu;
