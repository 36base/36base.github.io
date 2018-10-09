import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const style = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column-reverse',
    color: '#62727B',
    zIndex: 200,
  },
  font: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  },
});

const NumberBox = (props) => {
  const { classes, id } = props;

  return (
    <Grid className={classes.container} item xs={2}>
      <Typography className={classes.font} variant="display1" align="right">
        {`No. ${id}`}
      </Typography>
    </Grid>
  );
};

export default withStyles(style)(NumberBox);
