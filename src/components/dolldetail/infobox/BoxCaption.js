import React from 'react';
import { Grid, Typography, Divider } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const style = theme => ({
  wrapper: {
    minWidth: 200,
    maxWidth: 400,
    marginBottom: 50,
  },
  content: {
    padding: '5px 0',
  },
  caption: {
    fontSize: '1.25rem',
    color: 'grey',
  },
});

export const BoxCaption = withStyles(style)((props) => {
  const { classes, caption } = props;
  return (
    <Grid item xs={12}>
      <Typography className={classes.caption}>{caption}</Typography>
      <Divider />
    </Grid>
  );
});

export const Box = withStyles(style)((props) => {
  const { classes, children, name } = props;
  return (
    <div className={classes.wrapper}>
      <Grid item xs={12}>
        <Typography className={classes.caption}>{name}</Typography>
        <Divider />
      </Grid>
      <Grid className={classes.content} container>
        {children}
      </Grid>
    </div>
  );
});
