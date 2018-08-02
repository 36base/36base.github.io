import React from 'react';
import { Grid, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { injectIntl } from 'react-intl';

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
    <InfoBox name={props.intl.formatMessage({ id: 'Acquisition' })} >
      {buildRow(props.intl.formatMessage({ id: 'Production' }), timeToStr(props.build))}
      {buildRow(props.intl.formatMessage({ id: 'drop' }), props.drop.join(', ') || props.intl.formatMessage({ id: 'none' }))}
    </InfoBox>
  );
};

export default injectIntl(withStyles(style)(AcquisitionInfoBox));
