import React from 'react';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { FormControlLabel, Switch } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const style = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row-reverse',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '40px',
    },
    [theme.breakpoints.up('md')]: {
      paddingRight: '40px',
    },
    zIndex: 100,
  },
  button: {
    zIndex: 100,
  },
});

const TypeSwitchBox = (props) => {
  const {
    classes, on, toggle, t,
  } = props;

  return (
    <div className={classes.container}>
      <FormControlLabel
        className={classes.button}
        control={<Switch color="primary" onClick={toggle} checked={on} />}
        label={t('Damaged')}
      />
    </div>
  );
};

export default compose(
  translate(),
  withStyles(style),
)(TypeSwitchBox);
