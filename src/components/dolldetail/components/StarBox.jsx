import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import Star from '../../common/Star';

const style = {
  container: {
    zIndex: 200,
  },
  font: {
    color: '#FDA50C',
  },
};

const StarBox = props => (
  <Grid className={props.classes.container} item xs={2}>
    <Typography className={props.classes.font} variant="display2" align="right" >
      <Star count={props.count} />
    </Typography>
  </Grid>
);

const stateMapper = state => ({
  count: state.dolldetail.mounted.rank.starCnt,
});

export default connect(stateMapper)(withStyles(style)(StarBox));
