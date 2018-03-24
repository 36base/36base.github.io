import React from 'react';
import { withStyles } from 'material-ui/styles';

import ImageBox from '../../common/ImageBox';

const style = {
  container: {
    position: 'relative',
    flexGrow: 1,
    zIndex: 200,
  },
};

const Illust = (props) => {
  const { classes, src } = props;

  return (
    <div className={classes.container}>
      <ImageBox src={src} />
    </div>
  );
};

export default withStyles(style)(Illust);
