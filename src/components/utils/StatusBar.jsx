import React from 'react';
import { ListItem, ListItemIcon, ListItemText, Icon } from 'material-ui';

export default class StatusBar extends React.Component {
  render() {
    return (
      <div className="StatusBar">
        <ListItem
          className={this.props.ListItemClassName}
          button
          component={this.props.ComponentName}
        >
          <ListItemIcon className={this.props.ListItemIconClassName}>
            <Icon className={this.props.IconClassName} />
          </ListItemIcon>
          <ListItemText primary={this.props.ListItemTextPrimary} />
        </ListItem>
      </div>
    );
  }
}
