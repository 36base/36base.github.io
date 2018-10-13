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

const ScriptBox = ({
  t, id, skinCode, classes,
}) => {
  const { characterScript } = gfextradata({ locale: 'ko' });

  let script = { };
  if (characterScript[id]) {
    script = characterScript[id].default;

    if (characterScript[id][skinCode]) {
      script = characterScript[id][skinCode];
    }
  }

  const keyFormatMessage = (key) => {
    const label = Number(key.charAt(key.length - 1)) ? 'DIALOGUE' : key;
    return `${t(`PageMessage.Doll.Script.${label}`)}${label === 'DIALOGUE' ? key.charAt(key.length - 1) : ''}`;
  };

  const buildRow = (key, value) => {
    const str = value.replace(/<>/gi, '<br>');
    return [
      <Grid key="row" className={classes.container} container spacing={8}>
        <Grid item xs><Typography>{keyFormatMessage(key)}</Typography></Grid>
        <Grid item xs={8}><Typography dangerouslySetInnerHTML={{ __html: str }} /></Grid>
      </Grid>,
      <HorizonLine key="hr" />,
    ];
  };

  return (
    <InfoBox name={t('PageMessage.Doll.CharacterScript')}>
      {characterScript[id]
        ? Object.keys(script).map(iter => (iter === 'Introduce' ? (<div />) : buildRow(iter, script[iter])))
        : [
          <Grid key="row" className={classes.container} container spacing={8}>
            <Grid item xs>
              <Typography>
                [Error]
                {' '}
                {t('PageMessage.No Data')}
              </Typography>

            </Grid>
          </Grid>,
          <HorizonLine key="hr" />,
        ]
      }
    </InfoBox>
  );
};

export default compose(
  translate(),
  withStyles(style),
)(ScriptBox);
