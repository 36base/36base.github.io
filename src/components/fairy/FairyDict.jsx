import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import { Grid } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import FairyCard from './components/FairyCard';
// import SearchBar from './components/SearchBar';


const style = {
  wrapper: {
    width: '100%',
  },
};
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
