import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const style = {
  container: {
    width: '100%',
    height: '100%',
  },
  frame: {
    display: 'block',
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    top: 0,
    left: 0,
    border: 'none',
  },
};

class LogisticSupport extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <iframe title="군수지원 계산기" src="https://tempkaridc.github.io/gf/" className={classes.frame} />
      </div>
    );
  }
}

export default withStyles(style)(LogisticSupport);
