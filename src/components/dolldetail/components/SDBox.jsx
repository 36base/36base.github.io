import React from 'react';
import { withStyles } from 'material-ui/styles';
import * as PIXI from 'pixi.js';
import spine from 'pixi-spine';

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

const VIEW_ID = 'dolldetail-sd-view';

class SDBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 0,
      lastTime: 0,
      isUpdate: true,
      animations: [],
      animationName: '',
      player: null,
      stage: new PIXI.Container(),
      renderer: PIXI.autoDetectRenderer(props.width * 3, props.height, { transparent: true }),
    };

    this.setAnimation = this.setAnimation.bind(this);
    this.clear = this.clear.bind(this);
    this.setSpine = this.setSpine.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    document.getElementById(VIEW_ID).appendChild(this.state.renderer.view);
    window.requestAnimationFrame(t => this.tick(t));

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
    if (player && player.spineData && player.spineData.animations) {
      player.state.setAnimationByName(0, name, true);
      player.update(0);

      this.setState({
        animationName: name,
      });
    }
  }

  setSpine(skeleton) {
    const player = new spine.Spine(skeleton);
    const animations = player.spineData.animations.map(e => e.name);
    const scale = 1;

    player.position.set(this.props.width * 1.5, this.props.height - ((player.height * scale) / 5));
    player.scale.set(scale);
    player.animation_num = 0;
    player.state.setAnimationByName(0, animations[0], true);
    player.skeleton.setToSetupPose();
    player.autoUpdate = false;
    player.update(0);
    player.isupdate = true;

    this.setState({
      player,
      animations,
      animationName: animations[0],
    });

    this.state.stage.addChild(player);
    this.state.renderer.render(this.state.stage);
  }

  tick(time) {
    window.requestAnimationFrame(t => this.tick(t));
    this.setState({
      time,
      lastTime: this.state.time,
    });

    const d = this.state.time - this.state.lastTime;

    if (this.state.isUpdate) {
      const { player } = this.state;
      if (player && player.update && player.isupdate) {
        player.update(d / 1000);
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
    const { classes, width, height } = this.props;
    const { animations, animationName } = this.state;

    let selector = null;
    if (animations.length > 0) {
      selector = (
        <SmallSelector
          label=""
          values={animations.map(e => ({ value: e, name: e }))}
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

export default withStyles(style)(SDBox);
