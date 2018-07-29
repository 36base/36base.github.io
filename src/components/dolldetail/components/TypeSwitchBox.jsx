import React from 'react';
import { FormControlLabel, Switch } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { injectIntl } from 'react-intl';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'row-reverse',
    paddingRight: '40px',
  },
  button: {
    zIndex: 200,
  },
};

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
