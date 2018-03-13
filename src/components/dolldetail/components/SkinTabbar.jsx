import React from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import { setImgNo } from '../../../actions/doll';

const style = theme => ({
  container: {
    display: 'flex',
    zIndex: 200,
  },
  mixin: {
    display: 'inline-block',
    width: '10%',
    height: '100%',
  },
  button: {
    margin: `0 ${theme.spacing.unit / 2}px`,
    marginBottom: theme.spacing.unit,
    padding: `${theme.spacing.unit / 4}px ${theme.spacing.unit / 2}px`,
    minHeight: theme.spacing.unit * 3,
  },
});

const SkinTabbar = (props) => {
  const {
    classes,
    value,
    values,
    onBtnClick,
  } = props;

  const buttons = values.map((v, i) => (
    <Button
      key={v.name}
      className={classes.button}
      variant="raised"
      color={value === i ? 'primary' : 'default'}
      onClick={() => onBtnClick(i)}
    >
      {v.name}
    </Button>
  ));

  return (
    <Grid className={classes.container} item xs={10}>
      <span className={classes.mixin} />
      {buttons}
    </Grid>
  );
};

const stateMapper = state => ({
  value: state.dolldetail.imgNo,
  values: state.dolldetail.mounted.images,
});

const dispatchMapper = dispatch => ({
  onBtnClick: id => dispatch(setImgNo(id)),
});

export default connect(stateMapper, dispatchMapper)(withStyles(style)(SkinTabbar));
