import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import DollCard from './card/DollCard';

const style = {
  wrapper: {
    minWidth: 660,
    margin: '0 auto',
  },
};

class DollDict extends React.Component {
  render() {
    const { dolls, classes } = this.props;

    return (
      <Grid className={classes.wrapper} container>
        {dolls.map(doll => <DollCard key={doll.id} {...doll} />)}
      </Grid>
    );
  }
}

const stateMapper = state => ({
  width: state.common.width,
  dolls: state.dolldict.list,
});

export default withStyles(style)(connect(stateMapper)(DollDict));
