import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from 'material-ui';

import AppbarMenu from './AppbarMenu';
import AppbarMenuGroup from './AppbarMenuGroup';

class Appbar extends React.Component {
  render() {
    return (
      <AppBar color="primary" position="fixed">
        <Toolbar>
          <Button size="large" color="inherit" component={props => <Link to="/" {...props} />}>
            <Typography variant="title">36Base</Typography>
          </Button>
          <AppbarMenuGroup
            name="소녀전선 도감"
            icon="fa fa-book"
            items={[
              { name: '전술인형 도감', route: '/doll' },
              { name: '인형장비 도감', route: '/equip' },
              { name: '전술요정 도감', route: '/fairy' },
            ]}
          />
          <AppbarMenuGroup
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

export default withRouter(Appbar);
