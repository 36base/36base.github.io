import React from 'react';
import { Grid, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column-reverse',
    color: '#62727B',
    zIndex: 200,
  },
};

const NumberBox = (props) => {
  const { classes, id } = props;

  return (
    <Grid className={classes.container} item xs={2}>
      <Typography variant="display3" align="right">
        No.{id}
      </Typography>
    </Grid>
  );
};

export default withStyles(style)(NumberBox);
