import React from 'react';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import InfoBox from '../../common/InfoBox';
import HorizonLine from '../../common/HorizonLine';
import SmallSelector from '../../common/SmallSelector';

const style = theme => ({
  container: {
    paddingTop: theme.spacing.unit * 0.75,
    paddingBottom: theme.spacing.unit * 0.75,
    paddingLeft: theme.spacing.unit * 2,
  },
  selectors: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  selectorLabel: {
    fontSize: '0.8em',
    color: 'black',
  },
  selector: {
    color: 'black',
  },
});

const fullLvValues = Array(10).fill().map((_, i) => ({ value: i + 1, name: i + 1 }));

let lvValues = fullLvValues;

class StatusInfoBox extends React.Component {
  constructor(props) {
    super(props);

    const { maxLevel } = props;

    this.state = {
      level: maxLevel,
    };
  }

  componentWillMount() {
    const { maxLevel } = this.props;

    lvValues = fullLvValues.slice(0, maxLevel);
  }

  handleLevelChange = (event) => {
    this.setState({ level: event.target.value }, () => {
      const { handler } = this.props;
      const { level } = this.state;
      handler(level);
    });
  }

  render() {
    const {
      classes,
      t,
      stats,
      maxLevel,
    } = this.props;
    const { level } = this.state;

    const buildRow = (label, value) => [
      <Grid key="row" className={classes.container} container spacing={8}>
        <Grid item xs><Typography>{label}</Typography></Grid>
        <Grid item xs><Typography>{`${value.min} ~ ${value.max}`}</Typography></Grid>
      </Grid>,
      <HorizonLine key="hr" />,
    ];

    const selectors = (
      <div className={classes.selectors}>
        <div className={classes.selectorLabel}>
          {t('Stat.level')}
        </div>
        <SmallSelector
          values={maxLevel > 0 ? lvValues : [{ value: 0, name: '-' }]}
          selected={level}
          onChange={this.handleLevelChange}
        />
      </div>
    );
    return (
      <InfoBox name={t('PageMessage.Status')} selector={selectors}>
        {Object.keys(stats).map(key => buildRow(t(`Stat.${key}`), stats[key]))}
      </InfoBox>
    );
  }
}

export default compose(
  translate(),
  withStyles(style),
)(StatusInfoBox);
