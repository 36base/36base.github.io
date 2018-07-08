import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Hidden, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Icon, Collapse } from 'material-ui';
import { withStyles } from 'material-ui/styles';

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
  mixin: theme.mixins.toolbar,
});

class Menu extends React.Component {
  constructor(props) {
    super(props);

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
        <ListItemText primary={value.name} />
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
    return (
      <ListItem
        key={key}
        button
        onClick={() => this.routeTo(value.to)}
      >
        <ListItemIcon><Icon className={value.icon ? `fas ${value.icon}` : ''} /></ListItemIcon>
        <ListItemText primary={value.name} />
      </ListItem>
    );
  }

  render() {
    const { classes, list } = this.props;
    const items = (
      <List component="nav" >
        {Object.keys(list).map(key => this.renderMenuItem(key, list[key]))}
        <Divider />
        <ListItem key="about" button onClick={() => this.routeTo('/about')} >
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
        <Drawer variant="permanent" open classes={{ paper: classes.drawerPaper }} >
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

export default connect(stateMapper, dispatchMapper)(withStyles(style)(withRouter(Menu)));
