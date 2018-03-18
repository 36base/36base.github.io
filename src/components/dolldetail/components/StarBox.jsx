import React from 'react';
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
export default withStyles(style)(StarBox);
