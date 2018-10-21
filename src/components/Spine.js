import React from 'react';
import PropTypes from 'prop-types';
import { Stage } from 'react-pixi-fiber';
import PixiSpine from '../pixi/Spine';

const Spine = ({
  width, height, spineData, animation, options: { x = 0, y = 0, scale = 1 },
}) => {
  if (!spineData) {
    return (<div />);
  }
  return (
    <Stage width={width} height={height} options={{ transparent: true }}>
      <PixiSpine
        spineData={spineData}
        animation={animation}
        options={{ x, y, scale }}
      />
    </Stage>
  );
};

Spine.defaultProps = {
  options: {},
};

Spine.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types,
  spineData: PropTypes.object.isRequired,
  animation: PropTypes.string.isRequired,
  options: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    scale: PropTypes.number,
  }),
};

export default Spine;
