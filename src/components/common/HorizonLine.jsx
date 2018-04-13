import React from 'react';
import { Divider } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const style = theme => ({
  default: {
    width: '100%',
    backgroundColor: theme.palette.primary.dark,
  },
  height1: { height: 1 },
  height2: { height: 2 },
  height3: { height: 3 },
  height4: { height: 4 },
  height5: { height: 5 },
  height6: { height: 6 },
  height7: { height: 7 },
  height8: { height: 8 },
  height9: { height: 9 },
  height10: { height: 10 },
});

const HorizonLine = (props) => {
  const height = props.height || 1;
  const className = [props.classes.default, props.classes[`height${height}`]].join(' ');

  return (
    <Divider className={className} />
  );
};

export default withStyles(style)(HorizonLine);
