import React from 'react';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import gfextradata from 'girlsfrontline-extra-data';

import HorizonLine from '../../common/HorizonLine';
import InfoBox from '../../common/InfoBox';

const style = theme => ({
  container: {
    paddingTop: theme.spacing.unit * 0.75,
    paddingBottom: theme.spacing.unit * 0.75,
    paddingLeft: theme.spacing.unit * 2,
  },
});

const IntroduceBox = ({
  id,
  skinCode,
  classes,
  t,
}) => {
  const { characterScript } = gfextradata({ locale: 'ko' });

  let str = '';

  if (characterScript[id]) {
    str = (characterScript[id].default.Introduce);

    if (characterScript[id][skinCode]) {
      str = characterScript[id][skinCode].Introduce;
    }

    str = str.replace(/\\n/gi, '<br>');
  } else {
    str = `[Error] ${t('no data')}`;
  }

  return (
    <InfoBox name={t('Introduce')}>
      <Grid key="row" className={classes.container} container spacing={8}>
        <Grid item xs><Typography dangerouslySetInnerHTML={{ __html: str }} /></Grid>
      </Grid>
      <HorizonLine key="hr" />
    </InfoBox>
  );
};

export default compose(
  translate(),
  withStyles(style),
)(IntroduceBox);
