import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import * as PIXI from 'pixi.js';
import spine from 'pixi-spine';
import { injectIntl } from 'react-intl';

import InfoBox from '../../common/InfoBox';
import SmallSelector from '../../common/SmallSelector';

const style = theme => ({
  container: {
    position: 'relative',
    margin: `${theme.spacing.unit}px auto`,
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

let animationMap = {};

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

    this.setAnimation = this.setAnimation.bind(this);
    this.clear = this.clear.bind(this);
    this.setSpine = this.setSpine.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    document.getElementById(VIEW_ID).appendChild(this.state.renderer.view);

    if (this.props.seleton) {
      this.setSpine(this.props.skeleton);
    }
  }

  componentWillReceiveProps(newProps) {
    const { skeleton } = newProps;

    if (this.props.skeleton !== skeleton) {
      this.clear();
    }
    if (skeleton) {
      this.clear();
      this.setSpine(skeleton);
    }
  }

  shouldComponentUpdate(newProps, newState) {
    const { width, height, skeleton } = this.props;
    const { animationName } = this.state;
    return !(
      width === newProps.width &&
      height === newProps.height &&
      skeleton === newProps.skeleton &&
      animationName === newState.animationName
    );
  }

  setAnimation(name) {
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

  setSpine(skeleton) {
    const player = new spine.Spine(skeleton);
    const spineAnimations = player.spineData.animations.map(e => e.name);
    const animations = Object.keys(animationMap)
      .filter(key => spineAnimations.indexOf(key) >= 0)
      .map(key => ({ value: key, name: animationMap[key] }));
    const scale = 1;

    player.position.set(this.props.width * 1.5, this.props.height - ((player.height * scale) / 5));
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

    window.requestAnimationFrame(t => this.tick(t));
    this.state.stage.addChild(player);
    this.state.renderer.render(this.state.stage);
  }

  tick(time) {
    window.requestAnimationFrame(t => this.tick(t));
    const d = (time - this.state.time) / 1000;
    this.setState({ time });

    const { player } = this.state;

    if (this.state.isUpdate && player) {
      const track = player.state.tracks[0];

      if (track.time <= track.endTime && track.time + d > track.endTime) {
        switch (this.state.animationName) {
          case 'die':
            this.setState({ isUpdate: false });
            break;
          case 'victory':
            if (this.state.hasVictoryLoop) {
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

    this.state.renderer.render(this.state.stage);
  }

  clear() {
    this.state.stage.removeChildren();
    this.setState({
      player: null,
    });
  }

  render() {
    const {
      classes, width, height, intl,
    } = this.props;
    const { animations, animationName } = this.state;

    animationMap = {
      wait: intl.formatMessage({ id: 'Idle' }),
      move: intl.formatMessage({ id: 'Move' }),
      attack: intl.formatMessage({ id: 'Attack' }),
      s: intl.formatMessage({ id: 'Skill' }),
      reload: intl.formatMessage({ id: 'Reload' }),
      die: intl.formatMessage({ id: 'Dead' }),
      victory: intl.formatMessage({ id: 'Victory' }),
    };

    let selector = null;
    if (animations.length > 0) {
      selector = (
        <SmallSelector
          label=""
          values={animations}
          selected={animationName}
          onChange={e => this.setAnimation(e.target.value)}
        />
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

export default injectIntl(withStyles(style)(SDBox));
