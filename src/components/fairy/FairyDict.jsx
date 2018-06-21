import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import { Grid } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import FairyCard from './components/FairyCard';
// import SearchBar from './components/SearchBar';


const style = theme => ({
  wrapper: {
    width: '100%',
    [theme.breakpoints.down(2046)]: {
      width: '1520px',
      margin: '0 auto',
    },
    [theme.breakpoints.down(1856)]: {
      width: '1330px',
      margin: '0 auto',
    },
    [theme.breakpoints.down(1666)]: {
      width: '1140px',
      margin: '0 auto',
    },
    [theme.breakpoints.down(1559)]: {
      width: '1520px',
      margin: '0 auto',
    },
    [theme.breakpoints.down(1536)]: {
      width: '1330px',
      margin: '0 auto',
    },
    [theme.breakpoints.down(1346)]: {
      width: '1140px',
      margin: '0 auto',
    },
    [theme.breakpoints.down(1156)]: {
      width: '950px',
      margin: '0 auto',
    },
    [theme.breakpoints.down(966)]: {
      width: '760px',
      margin: '0 auto',
    },
    [theme.breakpoints.down(776)]: {
      width: '570px',
      margin: '0 auto',
    },
    [theme.breakpoints.down(586)]: {
      width: '380px',
      margin: '0 auto',
    },
    [theme.breakpoints.down(480)]: {
      width: '320px',
      margin: '0 auto',
    },
  },
});
// {list.map(fairy => <FairyCard key={fairy.id} {...fairy} />)}
/*
<Grid container>
  <Grid item xs={12}>
    <SearchBar />
  </Grid>
  <Grid item xs={12}>
  </Grid>
</Grid>
*/
class FairyDict extends React.Component {
  render() {
    const { list, classes } = this.props;
    return (
      <div className={classes.wrapper}>
        {list.map(fairy => <FairyCard key={fairy.id} {...fairy} />)}
      </div>
    );
  }
}


const stateMapper = state => ({
  list: state.fairydict.list,
});

export default connect(stateMapper)(withRouter(withStyles(style)(FairyDict)));
