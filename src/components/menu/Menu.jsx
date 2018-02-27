import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { clearMenu, initMenu, toggleMenu } from '../../actions/menu';

import './style/Menu.css';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.renderMenu = this.renderMenu.bind(this);
    this.renderMenuGroup = this.renderMenuGroup.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if(this.props.isMobile != newProps.isMobile) {
      newProps.isMobile ? this.props.clearMenu() : this.props.initMenu();
    }
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

  renderNavicon() {
    if(!this.props.isMobile) {
      return null;
    }

    const onClick = this.props.menus.length > 0 ? this.props.clearMenu : this.props.initMenu;
    const style = {
      display: "inline-block",
      float: "right",
      marginRight: "15px",
    };

    return (
      <span style={style} onClick={onClick}><i class="fa fa-lg fa-navicon" /></span>
    );
  }

  render() {
    return (
      <nav id="menu">
        <ul>
          <li className="undraggable menu-item title">
            <Link to="/">36베이스{this.renderNavicon()}</Link>
          </li>
          {this.props.menus.map(this.renderMenu)}
        </ul>
      </nav>
    );
  }
}

let stateMapper = (state) => {
  return {
    isMobile: state.common.isMobile,
    menus: state.menu.menus,
  };
};

let dispatchMapper = (dispatch) => {
  return {
    clearMenu: () => dispatch(clearMenu()),
    initMenu: () => dispatch(initMenu()),
    toggleMenu: (id) => dispatch(toggleMenu(id)),
  };
}

Menu = connect(stateMapper, dispatchMapper)(Menu);

export default Menu;
