import React from 'react';
import { Grid, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { injectIntl } from 'react-intl';

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
  // TODO: Rate of Fire에서 글자수 때문에 그래프스타일이 깨지는 문제발생 (2018-0729)
  return (
    <InfoBox name={props.intl.formatMessage({ id: 'Status' })}>
      {buildRow(props.intl.formatMessage({ id: 'Health' }), props.hp, 300, 'red')}
      {buildRow(props.intl.formatMessage({ id: 'Damage' }), props.pow, 200, 'brown')}
      {buildRow(props.intl.formatMessage({ id: 'Accuracy' }), props.hit, 100, 'yellow')}
      {buildRow(props.intl.formatMessage({ id: 'Evasion' }), props.dodge, 150, 'green')}
      {buildRow(props.intl.formatMessage({ id: 'Rate of Fire' }), props.rate, 120, 'orange')}
    </InfoBox>
  );
};

export default injectIntl(withStyles(style)(StatusInfoBox));
