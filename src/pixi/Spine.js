import * as PIXI from 'pixi.js';
import spine from 'pixi-spine';
import { CustomPIXIComponent } from 'react-pixi-fiber';

const Spine = CustomPIXIComponent({
  customDisplayObject: () => new PIXI.Container(),
  customApplyProps: (instance, oldProps, {
    spineData, animation, options: {
      x = 0, y = 0, scale = 1,
    } = {},
  }) => {
    if (spineData) {
      let player = null;
      if (spineData !== oldProps.spineData) {
        instance.removeChildren(0, instance.children.length);
        player = new spine.Spine(spineData);
        player.state.setAnimationByName(0, animation, true);
        instance.addChild(player);
      } else {
        player = instance.getChildAt(0);
      }

      if (animation !== oldProps.animation) {
        player.state.setAnimationByName(0, animation, true);
        if (animation === 'victory') {
          player.state.setAnimationByName(0, 'victory', false);
          player.state.addAnimationByName(0, 'victoryloop', true, 0);
        }
        if (animation === 'die') {
          player.state.setAnimationByName(0, 'die', false);
        }
      }

      player.position.set(x, y);
      player.scale.set(scale);
    }
  },
}, 'Spine');

export default Spine;
