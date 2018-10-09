import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Star from '../../common/Star';

const style = theme => ({
  container: {
    zIndex: 200,
  },
  font: {
    color: '#FDA50C',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
    },
  },
});

const StarBox = (props) => {
  const { classes, count } = props;

  return (
    <Grid className={classes.container} item>
      <Typography className={classes.font} variant="display1" align="right">
        <Star count={count} />
      </Typography>
    </Grid>
  );
};

export default withStyles(style)(StarBox);
