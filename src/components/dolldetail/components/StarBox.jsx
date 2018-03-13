import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import Star from '../../utils/Star';

const style = {
  container: {
    zIndex: 200,
  },
  font: {
    color: '#FDA50C',
  },
};

const stateMapper = state => ({
  count: state.dolldetail.rank.starCnt,
});

export default connect(stateMapper)(withStyles(style)((props) => {
  const { classes, count } = props;

  return (
    <Grid className={classes.container} item xs={2}>
      <Typography className={classes.font} variant="display2" align="right" >
        <Star count={count} />
      </Typography>
    </Grid>
  );
}));
