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

class MusicPlayer extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <iframe title="Music Player" src="https://girlsfrontline.kr/db/musicplayer/" className={classes.frame} />
      </div>
    );
  }
}

export default withStyles(style)(MusicPlayer);
