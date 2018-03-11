import React from 'react';
import { ListItem, ListItemIcon, ListItemText, Icon } from 'material-ui';

export default class SDMotion extends React.Component {
  render() {
    return (
      <div className="SDMotion">
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
