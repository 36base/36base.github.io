import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import './DollDetail.css';
import DollDetailHeader from './DollDetailHeader';
import DollDetailIllustBox from './DollDetailIllustBox';

function getBackgroundGradient() {
  const bg1 = 'linear-gradient(to right top, #505694 50%, transparent 50%)';
  const bg2 = 'linear-gradient(135deg, #8C94BF 20%, transparent 20%)';

  return { background: [bg1, bg2].join(',') };
}

const style = theme => ({
  wrapper: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  background: {
    position: 'absolute',
    left: 0,
    top: -64,
    width: '20%',
    height: 'calc(100% + 64px)',
  },
  header: {
    paddingTop: '2%',
    paddingRight: 25,
  },
  content: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  left: {
    minWidth: 512,
    flex: 1,
  },
  right: {
    flex: 1,
    backgroundColor: 'green',
    overflow: 'auto',
  },
});

class DollDetail extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const info = this.props.map.get(Number(this.props.match.params.id));
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.background} style={getBackgroundGradient()} />
        <div className={classes.header}>
          <DollDetailHeader info={info} />
        </div>
        <div className={classes.content}>
          <div className={classes.left}>
            <DollDetailIllustBox info={info} />
          </div>
          <div className={classes.right}>
            
          </div>
        </div>
      </div>
    );
  }
}

const stateMapper = state => ({
  map: state.doll.map,
  width: state.common.width,
  height: state.common.height,
});
const dispatchMapper = undefined;

export default connect(stateMapper, dispatchMapper)(withStyles(style)(DollDetail));
