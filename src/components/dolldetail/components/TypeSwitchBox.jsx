import React from 'react';
import { FormControlLabel, Switch } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { injectIntl } from 'react-intl';

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
    classes, on, toggle, intl,
  } = props;

  return (
    <div className={classes.container} >
      <FormControlLabel
        className={classes.button}
        control={<Switch color="primary" onClick={toggle} checked={on} />}
        label={intl.formatMessage({ id: 'Damaged' })}
      />
    </div>
  );
};

export default injectIntl(withStyles(style)(TypeSwitchBox));
