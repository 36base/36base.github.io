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
    minWidth: 660,
    margin: '0 auto',
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
    console.log(this.props);
    const { list } = this.props;
    
    return (
      <div className={style.wrapper}>
        {list.map(fairy => <FairyCard key={fairy.id} {...fairy} />)}
      </div>
    );
  }
}


const stateMapper = state => ({
  list: state.fairydict.list,
});

export default connect(stateMapper)(withRouter(withStyles(style)(FairyDict)));
