import React from 'react';
import { Grid, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { injectIntl } from 'react-intl';
import { characterScript } from 'girlsfrontline-extra-data';

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
  const script = characterScript[props.id];

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
      {Object.keys(script).map(iter => (iter === 'Introduce' ? (<div />) : buildRow(iter, script[iter])))}
    </InfoBox>
  );
};

export default injectIntl(withStyles(style)(ScriptBox));
