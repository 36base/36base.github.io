import React from 'react';
import { Grid, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';

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
  const buildRow = (label, value) => [
    <Grid key="row" className={props.classes.container} container spacing={8}>
      <Grid item xs><Typography>{label}</Typography></Grid>
      <Grid item xs={8}><Typography>{value}</Typography></Grid>
    </Grid>,
    <HorizonLine key="hr" />,
  ];

  return (
    <InfoBox name="획득처">
      {buildRow('제조', timeToStr(props.build))}
      {buildRow('드롭', props.drop.join(', ') || '없음')}
    </InfoBox>
  );
};

export default withStyles(style)(AcquisitionInfoBox);
