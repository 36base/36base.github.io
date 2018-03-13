import React from 'react';
import { connect } from 'react-redux';
import { FormControlLabel, Switch } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import { toggleImgType } from '../../../actions/doll';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'row-reverse',
    paddingRight: '40px',
  },
};

const stateMapper = state => ({
  on: state.dolldetail.image.type === 'damaged',
});

const dispatchMapper = dispatch => ({
  toggle: () => dispatch(toggleImgType()),
});

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

export default connect(stateMapper, dispatchMapper)(withStyles(style)(TypeSwitchBox));
