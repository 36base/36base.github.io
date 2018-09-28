import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
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

const IntroduceBox = (props) => {
  const { characterScript } = gfextradata({ locale: props.intl.locale });

  let str = '';

  if (characterScript[props.id]) {
    str = (characterScript[props.id].default.Introduce);

    if (characterScript[props.id][props.skinCode]) {
      str = characterScript[props.id][props.skinCode].Introduce;
    }

    str = str.replace(/\\n/gi, '<br>');
  } else {
    str = `[Error] ${props.intl.formatMessage({ id: 'no data' })}`;
  }

  return (
    <InfoBox name={props.intl.formatMessage({ id: 'Introduce' })} >
      <Grid key="row" className={props.classes.container} container spacing={8}>
        <Grid item xs><Typography dangerouslySetInnerHTML={{ __html: str }} /></Grid>
      </Grid>
      <HorizonLine key="hr" />
    </InfoBox>
  );
};

export default injectIntl(withStyles(style)(IntroduceBox));
