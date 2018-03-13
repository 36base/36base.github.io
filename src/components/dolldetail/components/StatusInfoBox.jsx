import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import InfoBox from '../../common/InfoBox';
import HorizonLine from '../../common/HorizonLine';

const style = theme => ({
  container: {
    paddingTop: theme.spacing.unit * 0.75,
    paddingBottom: theme.spacing.unit * 0.75,
    paddingLeft: theme.spacing.unit * 2,
  },
  statusBar: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    border: '1px solid grey',
  },
});

const StatusInfoBox = (props) => {
  const buildRow = (label, value, maxValue, color) => {
    const statusRate = Math.min(1, value / maxValue) * 100;
    const statusBackground = {
      background: `linear-gradient(to right, ${color} ${statusRate}%, transparent ${statusRate}%)`,
    };

    return [
      <Grid key="row" className={props.classes.container} container spacing={8}>
        <Grid item xs><Typography>{label}</Typography></Grid>
        <Grid item xs><Typography>{value}</Typography></Grid>
        <Grid item xs={8}>
          <div className={props.classes.statusBar} style={statusBackground} />
        </Grid>
      </Grid>,
      <HorizonLine key="hr" />,
    ];
  };

  return (
    <InfoBox name="스테이터스">
      {buildRow('체력', props.hp, 300, 'red')}
      {buildRow('화력', props.pow, 200, 'red')}
      {buildRow('명중', props.hit, 100, 'red')}
      {buildRow('회피', props.dodge, 150, 'red')}
      {buildRow('사속', props.rate, 120, 'red')}
    </InfoBox>
  );
};

const stateMapper = state => state.dolldetail.mounted.stats;

export default connect(stateMapper)(withStyles(style)(StatusInfoBox));
