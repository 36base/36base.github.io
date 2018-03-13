import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

import ImageBox from '../../utils/ImageBox';

const style = {
  container: {
    position: 'relative',
    flexGrow: 1,
    zIndex: 200,
  },
};

const stateMapper = state => ({
  image: state.dolldetail.image,
});

const Illust = (props) => {
  const { classes, image } = props;
  const path = image.values[image.idx][image.type];

  return (
    <div className={classes.container}>
      <ImageBox src={path} />
    </div>
  );
};

export default connect(stateMapper)(withStyles(style)(Illust));
