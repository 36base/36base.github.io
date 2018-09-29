import React from 'react';
import { storiesOf } from '@storybook/react';
import SkillBase from '../src/components/Skill/SkillBase';

storiesOf('SkillBase', module)
  .add('shield', () => (
    <SkillBase
      codename="shield"
      name="에너지 실드"
      description="포스실드를 펼치는 능력을 지니고 있습니다. 평소에는 방수, 방진, 반재밍에 사용할 수 있을 것 같습니다."
    />
  ));
