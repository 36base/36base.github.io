import React from 'react';
import { Grid, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { injectIntl } from 'react-intl';

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
    <InfoBox name={props.intl.formatMessage({ id: 'Basic Information' })}>
      {buildRow(props.intl.formatMessage({ id: 'type' }), props.armType)}
      {buildRow(props.intl.formatMessage({ id: 'Artist' }), props.illust)}
      {buildRow(props.intl.formatMessage({ id: 'voice actor' }), props.voice)}
    </InfoBox>
  );
};

export default injectIntl(withStyles(style)(BasicInfoBox));
