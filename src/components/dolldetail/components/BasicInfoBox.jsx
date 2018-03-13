import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import HorizonLine from '../../common/HorizonLine';
import InfoBox from '../../common/InfoBox';

const style = theme => ({
  container: {
    paddingTop: theme.spacing.unit * 0.75,
    paddingBottom: theme.spacing.unit * 0.75,
    paddingLeft: theme.spacing.unit * 2,
  },
});

const BasicInfoBox = (props) => {
  const buildRow = (label, value) => [
    <Grid key="row" className={props.classes.container} container spacing={8}>
      <Grid item xs><Typography>{label}</Typography></Grid>
      <Grid item xs={8}><Typography>{value}</Typography></Grid>
    </Grid>,
    <HorizonLine key="hr" />,
  ];

  return (
    <InfoBox name="기본정보">
      {buildRow('분류', props.armType)}
      {buildRow('일러스트', props.illustrator)}
      {buildRow('성우', props.voiceActor)}
    </InfoBox>
  );
};

const stateMapper = state => ({
  armType: state.dolldetail.mounted.type.enName,
  illustrator: state.dolldetail.mounted.illust || '알수없음',
  voiceActor: state.dolldetail.mounted.voice || '미정',
});

export default connect(stateMapper)(withStyles(style)(BasicInfoBox));
