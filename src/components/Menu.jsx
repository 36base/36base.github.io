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
    const { history, openMobile, toggleMobile: propToggleMobile } = this.props;
    history.push(path);
    if (openMobile) {
      propToggleMobile();
    }
  }

  renderMenuItem = ({
    id, icon, name, opened, children,
  }) => {
    const { t, expand: propExpand, classes } = this.props;

    return (
      <Fragment key={id}>
        <ListItem button onClick={() => propExpand(id)}>
          <ListItemIcon><Icon className={`fa fa-lg ${icon}`} /></ListItemIcon>
          <ListItemText primary={t(`Menu.${name}`)} />
          <Icon className={`fa fa-lg ${opened ? 'fa-angle-up' : 'fa-angle-down'}`} />
        </ListItem>
        {opened && (
          <Collapse className={classes.collapse} key={`${id}_collapse`} in={opened} timeout="auto">
            <List component="div" disablePadding>
              {
              Object.keys(children)
                .map(childKey => this.renderCollapse(childKey, children[childKey]))
            }
            </List>
          </Collapse>)}
      </Fragment>
    );
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
        <ListItemText primary={t(`Menu.${value.name}`)} />
      </ListItem>
    );
  }

  render() {
    const {
      classes,
      list,
      openMobile,
      toggleMobile: propToggleMobile,
    } = this.props;

    const items = (
      <List component="nav">
        {list.map(item => this.renderMenuItem(item))}
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
            open={openMobile}
            onClose={propToggleMobile}
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
