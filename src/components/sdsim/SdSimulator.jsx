import React from 'react';
import { withStyles } from 'material-ui/styles';

const style = {
  container: {
    width: '100%',
    height: '100%',
  },
  frame: {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    top: 0,
    left: 0,
    border: 'none',
  },
};

class SdSimulator extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <iframe title="SD 시뮬레이터" src="https://girlsfrontline.kr/db/simulator/" className={classes.frame} />
      </div>
    );
  }
}

export default withStyles(style)(SdSimulator);
