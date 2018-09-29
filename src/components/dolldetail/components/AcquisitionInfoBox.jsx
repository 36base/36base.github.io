import React from 'react';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import HorizonLine from '../../common/HorizonLine';
import InfoBox from '../../common/InfoBox';

function timeToStr(time) {
  if (time === undefined || time === 0) {
    return '불가';
  }

  const hour = Math.floor(time / 3600);
  const min = (time / 60) % 60;
  return `${hour < 10 ? '0' : ''}${hour} : ${min < 10 ? '0' : ''}${min}`;
}

const style = theme => ({
  container: {
    paddingTop: theme.spacing.unit * 0.75,
    paddingBottom: theme.spacing.unit * 0.75,
    paddingLeft: theme.spacing.unit * 2,
  },
});

const AcquisitionInfoBox = (props) => {
  const { classes, info, t } = props;

  const buildRow = (label, value) => [
    <Grid key="row" className={classes.container} container spacing={8}>
      <Grid item xs><Typography>{label}</Typography></Grid>
      <Grid item xs={8}><Typography>{value}</Typography></Grid>
    </Grid>,
    <HorizonLine key="hr" />,
  ];

  return (
    <InfoBox name={t('Acquisition')}>
      {buildRow(t('Production'), timeToStr(info.buildTime))}
      {buildRow(t('drop'), info.obtain.map(item => item.description).join(', ') || t('none'))}
    </InfoBox>
  );
};

export default compose(
  translate(),
  withStyles(style),
)(AcquisitionInfoBox);
