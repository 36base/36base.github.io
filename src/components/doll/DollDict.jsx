import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Grid } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import DollCard from './components/DollCard';
import SearchBar from './components/SearchBar';

const style = theme => ({
  wrapper: {
    width: '100%',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '0 auto',
    },
    [theme.breakpoints.up('md')]: {
      minWidth: 660,
    },
  },
  cardWrapper: {
    width: '1520px',
    margin: '0 auto',
    [theme.breakpoints.down(1857)]: {
      width: '1330px',
    },
    [theme.breakpoints.down(1667)]: {
      width: '1140px',
    },
    [theme.breakpoints.down(1560)]: {
      width: '1330px',
    },
    [theme.breakpoints.down(1370)]: {
      width: '1140px',
    },
    [theme.breakpoints.down(1180)]: {
      width: '950px',
    },
    [theme.breakpoints.down(990)]: {
      width: '760px',
    },
    [theme.breakpoints.down(800)]: {
      width: '570px',
    },
    [theme.breakpoints.down(610)]: {
      width: '380px',
    },
    [theme.breakpoints.down(480)]: {
      width: '320px',
    },
  },
});

class DollDict extends React.Component {
  render() {
    const { list, classes } = this.props;

    return (
      <Grid className={classes.wrapper} container>
        <Grid item xs={12}>
          <SearchBar />
        </Grid>
        <Grid className={classes.cardWrapper}>
          {list.map(doll => <DollCard key={doll.id} {...doll} />)}
        </Grid>
      </Grid>
    );
  }
}

const stateMapper = state => ({
  list: state.dolldict.list,
});

export default connect(stateMapper)(withRouter(withStyles(style)(DollDict)));
