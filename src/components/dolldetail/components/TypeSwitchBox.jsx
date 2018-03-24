import React from 'react';
import { FormControlLabel, Switch } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'row-reverse',
    paddingRight: '40px',
  },
};

const TypeSwitchBox = (props) => {
  const { classes, on, toggle } = props;

  return (
    <div className={classes.container} >
      <FormControlLabel
        control={<Switch color="primary" onClick={toggle} checked={on} />}
        label="중상보기"
      />
    </div>
  );
};

export default withStyles(style)(TypeSwitchBox);
