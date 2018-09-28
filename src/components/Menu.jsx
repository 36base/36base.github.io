import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { withRouter } from 'react-router';
import {
  Hidden, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Icon, Collapse,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';

import { toggleMobile, expand } from '../actions/menu';

const style = theme => ({
  drawerPaper: {
    width: '70%',
    [theme.breakpoints.up('lg')]: {
      width: theme.breakpoints.values.lg - theme.breakpoints.values.md,
    },
  },
  collapse: {
    paddingLeft: theme.spacing.unit * 3,
  },
  icon: {
    width: '30px',
  },
  mixin: theme.mixins.toolbar,
});

class Menu extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);

    const { cookies } = props;

    let langState = cookies.get('lang');

    if (langState === undefined) {
      langState = 'ko';
    }

    this.state = {
      languageName: langState,
    };

    this.routeTo = this.routeTo.bind(this);
    this.renderMenuItem = this.renderMenuItem.bind(this);
    this.renderCollapse = this.renderCollapse.bind(this);
  }

  routeTo(path) {
    this.props.history.push(path);
    if (this.props.openMobile) {
      this.props.toggleMobile();
    }
  }

  renderMenuItem(key, value) {
    const items = [
      <ListItem key={key} button onClick={() => this.props.expand(key)}>
        <ListItemIcon><Icon className={`fa fa-lg ${value.icon}`} /></ListItemIcon>
        <ListItemText primary={this.props.intl.formatMessage({ id: value.name })} />
        <Icon className={`fa fa-lg ${value.opened ? 'fa-angle-up' : 'fa-angle-down'}`} />
      </ListItem>,
    ];

    if (value.opened) {
      items.push((
        <Collapse className={this.props.classes.collapse} key={`${key}_collapse`} in={value.opened} timeout="auto">
          <List component="div" disablePadding>
            {
              Object.keys(value.children)
                .map(childKey => this.renderCollapse(childKey, value.children[childKey]))
            }
          </List>
        </Collapse>
      ));
    }
    return items;
  }

  renderCollapse(key, value) {
    if (value.fitLanguage) {
      const filtered = value.fitLanguage.filter(iter => iter === this.state.languageName);

      if (filtered.length === 0) return (<div />);
    }
    return (
      <ListItem
        key={key}
        button
        onClick={() => this.routeTo(value.to)}
      >
        <div className={this.props.classes.icon}>
          <ListItemIcon><Icon className={value.icon ? `fas ${value.icon}` : ''} /></ListItemIcon>
        </div>
        <ListItemText primary={this.props.intl.formatMessage({ id: value.name })} />
      </ListItem>
    );
  }

  render() {
    // eslint-disable-next-line
    const { classes, list, intl } = this.props;

    const items = (
      <List component="nav">
        {Object.keys(list).map(key => this.renderMenuItem(key, list[key]))}
        <Divider />
        <ListItem key="about" button onClick={() => this.routeTo('/about')}>
          <ListItemIcon>
            <Icon className="fa fa-lg fa-question-circle" />
          </ListItemIcon>
          <ListItemText inset primary="About / Contact" />
        </ListItem>
      </List>
    );

    return [
      <Hidden key="mobile" lgUp>
        <Drawer
          variant="temporary"
          anchor="left"
          open={this.props.openMobile}
          onClose={this.props.toggleMobile}
          classes={{ paper: classes.drawerPaper }}
        >
          <div className={classes.mixin} />
          {items}
        </Drawer>
      </Hidden>,
      <Hidden key="pc" mdDown implementation="css">
        <Drawer variant="permanent" open classes={{ paper: classes.drawerPaper }}>
          <div className={classes.mixin} />
          {items}
        </Drawer>
      </Hidden>,
    ];
  }
}

const stateMapper = state => ({
  list: state.menu.list,
  openMobile: state.menu.openMobile,
});

const dispatchMapper = dispatch => ({
  expand: id => dispatch(expand(id)),
  toggleMobile: () => dispatch(toggleMobile()),
});

export default compose(
  connect(stateMapper, dispatchMapper),
  injectIntl,
  withStyles(style),
  withRouter,
  withCookies,
)(Menu);
