import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const style = {
  container: {
    zIndex: 200,
  },
  inline: {
    display: 'inline-block',
  },
  mixin: {
    width: '15%',
    height: '100%',
  },
};

const stateMapper = state => ({
  name: state.dolldetail.name,
});

export default connect(stateMapper)(withStyles(style)((props) => {
  const { classes, name } = props;

  return (
    <Grid className={classes.container} item xs={10}>
      <span className={[classes.inline, classes.mixin].join(' ')} />
      <Typography className={classes.inline} variant="caption" color="primary">{name}</Typography>
    </Grid>
  );
}));
