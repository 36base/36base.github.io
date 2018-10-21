import React from 'react';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import HorizonLine from '../../common/HorizonLine';
import InfoBox from '../../common/InfoBox';

const style = theme => ({
  container: {
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
    paddingLeft: theme.spacing.unit * 2,
  },
});

const ScriptBox = ({
  t, classes, script,
}) => {
  const buildRow = (key, value) => {
    const line = (value || ['']).join(', ');
    const str = line.replace(/<>/gi, '<br>');
    return (
      <Grid key={key} className={classes.container} container spacing={8}>
        <Grid item xs><Typography>{t(`PageMessage.Doll.Script.${key}`)}</Typography></Grid>
        <Grid item xs={10}><Typography dangerouslySetInnerHTML={{ __html: str }} /></Grid>
        <Grid item xs={12}><HorizonLine /></Grid>
      </Grid>
    );
  };

  return (
    <InfoBox name={t('PageMessage.Doll.CharacterScript')}>
      {script
        ? Object.keys(script).map(iter => (iter === 'introduce' ? (<div key="introduce" />) : buildRow(iter, script[iter])))
        : (
          <Grid key="error" className={classes.container} container spacing={8}>
            <Grid item xs>
              <Typography>
                {'[Error] '}
                {t('PageMessage.No Data')}
              </Typography>

            </Grid>
            <Grid item xs={12}><HorizonLine /></Grid>
          </Grid>
        )
      }
    </InfoBox>
  );
};

export default compose(
  translate(),
  withStyles(style),
)(ScriptBox);
