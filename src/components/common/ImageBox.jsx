import React from 'react';
import { withStyles } from 'material-ui/styles';

const style = {
  box: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
};

const ImageBox = (props) => {
  const { classes, src } = props;

  return (
    <div className={classes.box} style={{ backgroundImage: `url(${src})` }} />
  );
};

export default withStyles(style)(ImageBox);
