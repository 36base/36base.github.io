import React from 'react';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import InfoBox from '../../common/InfoBox';
import Square from '../../common/Square';
import SmallSelector from '../../common/SmallSelector';

const style = theme => ({
  container: {
    padding: `${theme.spacing.unit}px 0`,
  },
  wrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: 180,
    margin: '0 auto',
    borderLeft: '1px solid black',
    borderTop: '1px solid black',
  },
  explain: {
    display: 'flex',
    marginLeft: '10px',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  yellow: {
    color: '#FDA50C',
  },
  grid: {
    position: 'absolute',
    width: '33.33%',
    height: '33.33%',
    borderRight: '1px solid black',
    borderBottom: '1px solid black',
  },
  center: {
    backgroundColor: 'white',
  },
  effected: {
    backgroundColor: '#18FFFF',
  },
  default: {
    backgroundColor: '#ABABAB',
  },
});

const effectGridList = [
  [1, { left: 0, top: '66.66%' }],
  [2, { left: '33.33%', top: '66.66%' }],
  [3, { left: '66.66%', top: '66.66%' }],
  [4, { left: 0, top: '33.33%' }],
  [5, { left: '33.33%', top: '33.33%' }],
  [6, { left: '66.66%', top: '33.33%' }],
  [7, { left: 0, top: 0 }],
  [8, { left: '33.33%', top: 0 }],
  [9, { left: '66.66%', top: 0 }],
];
const targetMap = new Map([
  ['all', '모든 인형'],
  ['hg', 'hg'],
  ['smg', 'smg'],
  ['rifle', 'rf'],
  ['ar', 'ar'],
  ['mg', 'mg'],
  ['sg', 'sg'],
]);
const typeMap = new Map([
  ['pow', 'Damage'],
  ['hit', 'Accuracy'],
  ['dodge', 'Evasion'],
  ['rate', 'Rate of Fire'],
  ['criticalPercent', 'Crit Rate'],
  ['cooldown', 'cool down'],
]);

const rateOptions = [
  { value: 1, name: 1 },
  { value: 1.25, name: 2 },
  { value: 1.5, name: 3 },
  { value: 1.75, name: 4 },
  { value: 2, name: 5 },
];

class EffectBox extends React.Component {
  state = {
    rate: 2,
  };

  onChangeRate = (event) => {
    const { value } = event.target;
    this.setState({
      rate: value,
    });
  }

  renderSelector = () => {
    const { hasLevel, t } = this.props;
    const { rate } = this.state;
    if (!hasLevel) {
      return null;
    }

    return (
      <SmallSelector
        label={t('Combine')}
        values={rateOptions}
        selected={rate}
        onChange={this.onChangeRate}
      />
    );
  }

  render() {
    const {
      t,
      classes,
      effectCenter,
      effectPos,
      effectType,
      gridEffect,
      hasLevel,
    } = this.props;
    const { rate } = this.state;

    const grids = effectGridList.map((e) => {
      let type = classes.default;
      if (e[0] === effectCenter) {
        type = classes.center;
      } else if (effectPos.indexOf(e[0]) >= 0) {
        type = classes.effected;
      }
      return (
        <div key={e[0]} className={[classes.grid, type].join(' ')} style={e[1]} />
      );
    });
    const target = targetMap.get(effectType);
    const effects = Object.keys(gridEffect).map((key) => {
      const type = typeMap.get(key);
      const value = gridEffect[key];

      return `${t(type)} ${t('up')} ${hasLevel ? value * rate : value}%`;
    }).join(', ');

    return (
      <InfoBox name={t('Tiles')} selector={this.renderSelector()}>
        <Grid className={classes.container} container>
          <Grid item xs={4}>
            <div className={classes.wrapper}>
              <Square>{grids}</Square>
            </div>
          </Grid>
          <Grid className={classes.explain} item xs>
            <Typography>
              {'버프칸의'}
              {' '}
              <span className={classes.yellow}>{t(target)}</span>
              {'에게'}
              {' '}
              {effects}
            </Typography>
          </Grid>
        </Grid>
      </InfoBox>
    );
  }
}

export default compose(
  translate(),
  withStyles(style),
)(EffectBox);
