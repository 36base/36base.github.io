import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Grid from '@material-ui/core/Grid';
import FairyCard from '../src/components/Fairy/FairyCard';
import Provider from './Provider';
import store from '../src/store';
import FairyTable from '../src/components/Fairy/FairyTable';

const fairyCardProps = {
  onClick: action('clicked'),
  style: { maxWidth: 344 },
};

storiesOf('FairyCard', module)
  .add('DJMAXSUEE', () => (
    <Grid container>
      <Grid item>
        <FairyCard
          codename="DJMAXSUEE"
          name="스이"
          category="strategy"
          introduce="“전 당신이 필요해요, 제 곁에 있어주세요！”"
          description="지정 위치에 이로운 효과를 부여하는 능력을 가지고 있습니다, 평소에는 동료들을 몰래 관찰하거나 데이트를 미행하곤 합니다."
          skins={[
            { id: 67, codename: 'DJMAXSUEE_1' },
            { id: 68, codename: 'DJMAXSUEE_2' },
            { id: 69, codename: 'DJMAXSUEE_3' },
          ]}
          skill={{ codename: 'IWantU', name: 'I WANT YOU' }}
          {...fairyCardProps}
        />
      </Grid>
    </Grid>
  ))
  .add('shield', () => (
    <Grid container>
      <Grid item>
        <FairyCard
          codename="shield"
          name="수호요정"
          category="battle"
          introduce='"이제 무서워하지 않아도 괜찮아요."'
          description="포스실드를 펼치는 능력을 지니고 있습니다. 평소에는 방수, 방진, 반재밍에 사용할 수 있을 것 같습니다."
          skins={[
            { id: 10, codename: 'shield_1' },
            { id: 11, codename: 'shield_2' },
            { id: 12, codename: 'shield_3' },
          ]}
          skill={{ codename: 'shield', name: '에너지 실드' }}
          {...fairyCardProps}
        />
      </Grid>
    </Grid>
  ));

storiesOf('FairyTable', module)
  .addDecorator(story => <Provider story={story()} />)
  .add('default', () => (
    <FairyTable fairies={store.getState().fairyDict.fairies} onSort={action('sort')} />
  ));
