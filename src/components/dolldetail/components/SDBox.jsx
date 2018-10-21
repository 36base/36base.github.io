import React, { Component } from 'react';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { FormControlLabel, Switch } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Spine from '../../Spine';

import InfoBox from '../../common/InfoBox';
import SmallSelector from '../../common/SmallSelector';

const style = theme => ({
  container: {
    position: 'relative',
    margin: `${theme.spacing.unit}px auto`,
  },
  selector: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  sdView: {
    position: 'absolute',
    width: '300%',
    height: '100%',
    left: '-100%',
    zIndex: '1000',
  },
  listWrapper: {
    flexGrow: 1,
  },
});

const ANIMATION_SORT_ORDER = [
  'wait',
  'move',
  'pick',
  'sit',
  'lying',
  'attack',
  'attack2',
  's',
  'die',
  'victory',
];

class SDBox extends Component {
  state = {
    currentAnimation: 'wait',
  }

  handleSelect = (e) => {
    const animation = e.target.value;
    this.setState({ currentAnimation: animation });
  }

  handleToggle = () => {
    const { toggleStayingHandler } = this.props;
    this.setState({ currentAnimation: 'wait' });
    toggleStayingHandler();
  }

  render() {
    const {
      t,
      classes,
      width,
      height,
      skeleton,
    } = this.props;
    const { currentAnimation } = this.state;

    if (!skeleton) {
      return (<div />);
    }

    const animations = skeleton.animations
      .map(anim => anim.name)
      .filter(anim => anim !== 'victoryloop')
      .sort((a, b) => (
        ANIMATION_SORT_ORDER.findIndex(e => e === a)
        - ANIMATION_SORT_ORDER.findIndex(e => e === b)
      ))
      .map(anim => ({ value: anim, name: t(`PageMessage.Doll.SD Motion.${anim}`) }));
    let selector = null;
    if (animations.length > 0) {
      selector = (
        <div className={classes.selector}>
          <FormControlLabel
            style={{ display: 'inline-flex' }}
            control={<Switch color="primary" onClick={this.handleToggle} />}
            label={t('PageMessage.Doll.Show Staying SD')}
          />
          <SmallSelector
            label=""
            values={animations}
            selected={currentAnimation}
            // onChange={e => this.setAnimation(e.target.value)}
            onChange={this.handleSelect}
          />
        </div>
      );
    }

    return (
      <InfoBox name="SD" selector={selector}>
        <div className={classes.container} style={{ width, height }}>
          <Spine
            width={width}
            height={height}
            spineData={skeleton}
            animation={currentAnimation}
            options={{ x: width / 2, y: height / 2 }}
          />
        </div>
      </InfoBox>
    );
  }
}

export default compose(
  translate(),
  withStyles(style),
)(SDBox);
