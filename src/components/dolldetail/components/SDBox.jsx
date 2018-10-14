import React from 'react';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { FormControlLabel, Switch } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import * as PIXI from 'pixi.js';
import spine from 'pixi-spine';

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

const VIEW_ID = 'dolldetail-sd-view';

class SDBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 0,
      isUpdate: true,
      animations: [],
      animationName: '',
      player: null,
      stage: new PIXI.Container(),
      renderer: PIXI.autoDetectRenderer(props.width * 3, props.height, { transparent: true }),
      hasVictoryLoop: true,
    };
  }

  componentDidMount() {
    const { skeleton } = this.props;
    const { renderer } = this.state;
    document.getElementById(VIEW_ID).appendChild(renderer.view);

    if (skeleton) {
      this.setSpine(skeleton);
    }
  }

  componentWillReceiveProps(newProps) {
    const { skeleton: prevSkeleton } = this.props;
    const { skeleton: newSkeleton } = newProps;

    if (prevSkeleton !== newSkeleton) {
      this.clear();
    }
    if (newSkeleton) {
      this.clear();
      this.setSpine(newSkeleton);
    }
  }

  shouldComponentUpdate(newProps, newState) {
    const { width, height, skeleton } = this.props;
    const { animationName } = this.state;
    return !(
      width === newProps.width
      && height === newProps.height
      && skeleton === newProps.skeleton
      && animationName === newState.animationName
    );
  }

  setAnimation = (name) => {
    const { player } = this.state;
    if (player) {
      player.state.clearTrack();
      player.state.setAnimationByName(0, name, true);
      player.update(0);

      this.setState({
        animationName: name,
        isUpdate: true,
      });
    }
  }

  setSpine = (skeleton) => {
    const { t, width, height } = this.props;
    const { stage, renderer } = this.state;

    const player = new spine.Spine(skeleton);
    const spineAnimations = player.spineData.animations.map(e => e.name);
    const animations = spineAnimations.reduce((sum, e) => {
      if (e !== 'victoryloop') {
        sum.push({ value: e, name: t(`SD Motion.${e}`) });
      }
      return sum;
    }, []);
    const scale = 1;

    player.position.set(width * 1.5, height - ((player.height * scale) / 5));
    player.scale.set(scale);
    player.animation_num = 0;
    player.state.setAnimationByName(0, animations[0].value, true);
    player.skeleton.setToSetupPose();
    player.autoUpdate = false;
    player.update(0);
    player.isupdate = true;

    this.setState({
      player,
      animations,
      animationName: animations[0].value,

      hasVictoryLoop: spineAnimations.indexOf('victoryloop') >= 0,
    });

    window.requestAnimationFrame(e => this.tick(e));
    stage.addChild(player);
    renderer.render(stage);
  }

  tick = (time) => {
    const {
      time: stateTime,
      isUpdate,
      animationName,
      hasVictoryLoop,
      renderer,
      stage,
    } = this.state;

    window.requestAnimationFrame(t => this.tick(t));
    const d = (time - stateTime) / 1000;
    this.setState({ time });

    const { player } = this.state;

    if (isUpdate && player) {
      const track = player.state.tracks[0];

      if (track.time <= track.endTime && track.time + d > track.endTime) {
        switch (animationName) {
          case 'die':
            this.setState({ isUpdate: false });
            break;
          case 'victory':
            if (hasVictoryLoop) {
              player.state.clearTrack();
              player.state.setAnimationByName(0, 'victoryloop', true);
              player.update(0);
            } else {
              player.update(d);
            }
            break;
          default:
            player.update(d);
        }
      } else {
        player.update(d);
      }
    }

    renderer.render(stage);
  }

  clear = () => {
    const { stage } = this.state;
    stage.removeChildren();
    this.setState({
      player: null,
    });
  }

  render() {
    const {
      t,
      classes,
      width,
      height,
      toggleStayingHandler,
    } = this.props;
    const { animations, animationName } = this.state;

    let selector = null;
    if (animations.length > 0) {
      selector = (
        <div className={classes.selector}>
          <FormControlLabel
            style={{ display: 'inline-flex' }}
            control={<Switch color="primary" onClick={toggleStayingHandler} />}
            label={t('PageMessage.Doll.Show Staying SD')}
          />
          <SmallSelector
            label=""
            values={animations}
            selected={animationName}
            onChange={e => this.setAnimation(e.target.value)}
          />
        </div>
      );
    }

    return (
      <InfoBox name="SD" selector={selector}>
        <div className={classes.container} style={{ width, height }}>
          <div id={VIEW_ID} className={classes.sdView} />
        </div>
      </InfoBox>
    );
  }
}

export default compose(
  translate(),
  withStyles(style),
)(SDBox);
