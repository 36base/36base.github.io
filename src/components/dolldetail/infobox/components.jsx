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
  boxContent: {
    padding: `${theme.spacing.unit * 2}px 0`,
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
  statusBar: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    border: '1px solid grey',
  },
  divider: {
    backgroundColor: theme.palette.primary.dark,
  },
});

export const Box = withStyles(style)((props) => {
  const { classes, name, bottomLine } = props;
  const children = React.Children.toArray(props.children);

  return (
    <div className={classes.boxWrapper}>
      <Grid item xs={12}>
        <Typography className={classes.boxName}>{name}</Typography>
      </Grid>
      {children.reduce((arr, e) => {
        arr.push(<Divider className={classes.divider} />);
        arr.push(e);
        return arr;
      }, [])}
      {bottomLine ? <Divider className={classes.divider} /> : ''}
    </div>
  );
});

export const Row = withStyles(style)((props) => {
  const {
    classes,
    label,
    value,
  } = props;
  return (
    <Grid className={classes.rowWrapper} container spacing={8}>
      <Grid item xs><Typography className={classes.rowLabel}>{label}</Typography></Grid>
      <Grid item xs={8}><Typography className={classes.rowValue}>{value}</Typography></Grid>
    </Grid>
  );
});

export const StatusRow = withStyles(style)((props) => {
  const {
    classes,
    color,
    label,
    value,
    maxValue,
  } = props;
  const statusRate = Math.min(1, value / maxValue) * 100;

  return (
    <Grid className={classes.rowWrapper} container spacing={8}>
      <Grid item xs><Typography>{label}</Typography></Grid>
      <Grid item xs><Typography>{value}</Typography></Grid>
      <Grid item xs={8} >
        <div
          className={classes.statusBar}
          style={{ background: `linear-gradient(to right, ${color} ${statusRate}%, transparent ${statusRate}%)` }}
        />
      </Grid>
    </Grid>
  );
});

export const SDPlayer = withStyles(style)((props) => {
  const { sd } = props;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundImage: `url(${sd})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      }}
    />
  );
});

