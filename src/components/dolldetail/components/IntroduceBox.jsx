import React from 'react';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
  t,
  classes,
  script,
}) => {
  let str = '';

  if (script && script.introduce) {
    const { introduce } = script;
    str = introduce[0] ? introduce[0] : [`[Error] ${t('no data')}`];
    str = str.replace(/\\n/gi, '<br>');
  } else {
    str = `[Error] ${t('no data')}`;
  }

  return (
    <InfoBox name={t('PageMessage.Doll.Script.introduce')}>
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
