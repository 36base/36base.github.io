import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { AppBar, Toolbar, Button } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import AppbarMenu from './AppbarMenu';
import AppbarMenuGroup from './AppbarMenuGroup';

const style = {
  titleMenu: {
    color: '#80deea',
    fontWeight: 700,
    fontSize: '2.0rem',
  },
  menu: {
    color: '#FFFFFF',
    fontWeight: 500,
    fontSize: '1.75rem',
  },
};

class Appbar extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <AppBar color="primary" position="fixed">
        <Toolbar>
          <Button className={classes.titleMenu} component={props => <Link to="/" {...props} />}>
            36Base
          </Button>
          <AppbarMenuGroup
            className={classes.menu}
            name="소녀전선 도감"
            icon="fa fa-book"
            items={[
              { name: '전술인형 도감', route: '/doll' },
              { name: '인형장비 도감', route: '/equip' },
              { name: '전술요정 도감', route: '/fairy' },
            ]}
          />
          <AppbarMenuGroup
            className={classes.menu}
            name="기타 편의기능"
            icon="fa fa-archive"
            items={[
              { name: '작전보고서 계산기', route: '/calculator' },
              { name: 'SD 시뮬레이터', route: '/sdsim' },
            ]}
          />
          <AppbarMenu name="About / Contact" icon="fa fa-question-circle" link="/about" />
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(style)(withRouter(Appbar));
