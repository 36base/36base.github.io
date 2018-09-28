import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
  <Grid className={props.classes.container} item>
    <Typography className={props.classes.font} variant="display2" align="right" >
      <Star count={props.count} />
    </Typography>
  </Grid>
);
export default withStyles(style)(StarBox);
