import React from 'react';
import { connect } from 'react-redux';
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
  const { classes, path } = props;

  return (
    <div className={classes.container}>
      <ImageBox src={path} />
    </div>
  );
};

const stateMapper = (state) => {
  const { images } = state.dolldetail.mounted;
  const { imgNo } = state.dolldetail;
  const imgType = state.dolldetail.imgDamaged ? 'damaged' : 'normal';

  return {
    path: images[imgNo][imgType],
  };
};

export default connect(stateMapper)(withStyles(style)(Illust));
