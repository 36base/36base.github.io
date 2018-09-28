import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl, FormattedMessage } from 'react-intl';
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

const ScriptBox = (props) => {
  const { characterScript } = gfextradata({ locale: props.intl.locale });

  let script = { };
  if (characterScript[props.id]) {
    script = characterScript[props.id].default;

    if (characterScript[props.id][props.skinCode]) {
      script = characterScript[props.id][props.skinCode];
    }
  }

  const keyFormatMessage = (key) => {
    const label = Number(key.charAt(key.length - 1)) ? 'DIALOGUE' : key;
    return `${props.intl.formatMessage({ id: label })}${label === 'DIALOGUE' ? key.charAt(key.length - 1) : ''}`;
  };

  const buildRow = (key, value) => {
    const str = value.replace(/<>/gi, '<br>');
    return [
      <Grid key="row" className={props.classes.container} container spacing={8}>
        <Grid item xs><Typography>{keyFormatMessage(key)}</Typography></Grid>
        <Grid item xs={8}><Typography dangerouslySetInnerHTML={{ __html: str }} /></Grid>
      </Grid>,
      <HorizonLine key="hr" />,
    ];
  };

  return (
    <InfoBox name={props.intl.formatMessage({ id: 'CharacterScript' })} >
      {characterScript[props.id] ?
        Object.keys(script).map(iter => (iter === 'Introduce' ? (<div />) : buildRow(iter, script[iter]))) :
        [
          <Grid key="row" className={props.classes.container} container spacing={8}>
            <Grid item xs><Typography>[Error] <FormattedMessage id="no data" /></Typography></Grid>
          </Grid>,
          <HorizonLine key="hr" />,
        ]
      }
    </InfoBox>
  );
};

export default injectIntl(withStyles(style)(ScriptBox));
