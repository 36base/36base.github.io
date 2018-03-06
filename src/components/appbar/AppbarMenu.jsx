import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'material-ui';

export default class AppbarMenu extends React.Component {
  render() {
    const { name, icon, link } = this.props;
    return (
      <Button color="inherit" component={props => <Link to={link} {...props} />}>
        <Icon style={{ marginRight: '5px' }} className={icon} />
        {name}
      </Button>
    );
  }
}
