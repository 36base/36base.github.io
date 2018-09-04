import React from 'react';
import { Grid, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';
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

  const str = characterScript[props.id] ?
    (characterScript[props.id].default.Introduce).replace(/\\n/gi, '<br>') :
    (`[Error] ${props.intl.formatMessage({ id: 'no data' })}`);

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
