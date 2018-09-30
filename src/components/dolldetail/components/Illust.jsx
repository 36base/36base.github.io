import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import ImageBox from '../../common/ImageBox';
import Square from '../../common/Square';

const style = theme => ({
  container: {
    position: 'relative',
    width: '100%',
    top: '50%',
    zIndex: 150,
    [theme.breakpoints.up('md')]: {
      transform: 'translateY(-50%)',
    },
  },
});

const Illust = (props) => {
  const { classes, src } = props;

  return (
    <div className={classes.container}>
      <Square><ImageBox src={src} /></Square>
    </div>
  );
};

export default withStyles(style)(Illust);
