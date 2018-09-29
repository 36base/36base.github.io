import React, { Fragment } from 'react';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Hidden, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Icon, Collapse,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { toggleMobile, expand } from '../store/modules/menu';

const style = theme => ({
  drawerPaper: {
    minWidth: '300px',
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
  routeTo = (path) => {
    this.props.history.push(path);
    if (this.props.openMobile) {
      this.props.toggleMobile();
    }
  }

  renderMenuItem = (key, value) => {
    const { t, expand, classes } = this.props;
    const items = [
      <ListItem key={key} button onClick={() => expand(key)}>
        <ListItemIcon><Icon className={`fa fa-lg ${value.icon}`} /></ListItemIcon>
        <ListItemText primary={t(value.name)} />
        <Icon className={`fa fa-lg ${value.opened ? 'fa-angle-up' : 'fa-angle-down'}`} />
      </ListItem>,
    ];

    if (value.opened) {
      items.push((
        <Collapse className={classes.collapse} key={`${key}_collapse`} in={value.opened} timeout="auto">
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

  renderCollapse = (key, value) => {
    const { classes, t, i18n } = this.props;
    if (value.fitLanguage) {
      const filtered = value.fitLanguage.filter(iter => iter === i18n.language);

      if (filtered.length === 0) return (<div />);
    }
    return (
      <ListItem
        key={key}
        button
        onClick={() => this.routeTo(value.to)}
      >
        <div className={classes.icon}>
          <ListItemIcon><Icon className={value.icon ? `fas ${value.icon}` : ''} /></ListItemIcon>
        </div>
        <ListItemText primary={t(value.name)} />
      </ListItem>
    );
  }

  render() {
    const {
      classes, list, t, i18n,
    } = this.props;

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

    return (
      <Fragment>
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
        </Hidden>
        <Hidden key="pc" mdDown implementation="css">
          <Drawer variant="permanent" open classes={{ paper: classes.drawerPaper }}>
            <div className={classes.mixin} />
            {items}
          </Drawer>
        </Hidden>
      </Fragment>
    );
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
  withRouter,
  translate(),
  connect(stateMapper, dispatchMapper),
  withStyles(style),
)(Menu);
