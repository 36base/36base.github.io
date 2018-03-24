import React from 'react';
import { withStyles } from 'material-ui/styles';

const style = {
  square: {
    position: 'relative',
    width: '100%',
    height: 0,
    paddingBottom: '100%',
  },
  content: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
};

export default withStyles(style)((props) => {
  const { classes, children, styles } = props;
  const className = styles ? [styles, classes.content].join(' ') : classes.content;

  return (
    <div className={classes.square} >
      <div className={className} >
        {children}
      </div>
    </div>
  );
});
