import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Grid } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import DollCard from './components/DollCard';
import SearchBar from './components/SearchBar';

const style = {
  wrapper: {
    width: '100%',
    minWidth: 660,
    margin: '0 auto',
  },
};

class DollDict extends React.Component {
  render() {
    const { list, classes } = this.props;

    return (
      <Grid className={classes.wrapper} container>
        <Grid item xs={12}>
          <SearchBar />
        </Grid>
        <Grid item xs={12}>
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
