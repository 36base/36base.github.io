import React from 'react';
import { Grid, Typography, Divider } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const style = theme => ({
  boxWrapper: {
    minWidth: 200,
    maxWidth: 400,
    marginBottom: theme.spacing.unit * 5,
  },
  boxName: {
    fontSize: '1.25rem',
    color: 'grey',
    paddingLeft: theme.spacing.unit * 2,
  },

  rowWrapper: {
    paddingTop: theme.spacing.unit * 0.75,
    paddingBottom: theme.spacing.unit * 0.75,
    paddingLeft: theme.spacing.unit * 2,
  },
  rowLabel: {

  },
  rowValue: {

  },

  divider: {
    backgroundColor: theme.palette.primary.dark,
  },
});

export const Box = withStyles(style)((props) => {
  const { classes, children, name } = props;
  return (
    <div className={classes.boxWrapper}>
      <Grid item xs={12}>
        <Typography className={classes.boxName}>{name}</Typography>
      </Grid>
      <Divider className={classes.divider} />
      {children}
    </div>
  );
});

export const Row = withStyles(style)((props) => {
  const {
    classes,
    divider,
    label,
    value,
  } = props;
  const row = (
    <Grid className={classes.rowWrapper} container spacing={6}>
      <Grid item xs><Typography className={classes.rowLabel}>{label}</Typography></Grid>
      <Grid item xs={8}><Typography className={classes.rowValue}>{value}</Typography></Grid>
    </Grid>
  );

  if (divider) {
    return [row, <Divider className={classes.divider} />];
  }
  return row;
});
