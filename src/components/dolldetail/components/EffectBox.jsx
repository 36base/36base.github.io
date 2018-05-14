import React from 'react';
import { Grid, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';

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
  ['hg', '권총'],
  ['smg', '기관단총'],
  ['rifle', '소총'],
  ['ar', '돌격소총'],
  ['mg', '기관총'],
  ['sg', '산탄총'],
]);
const typeMap = new Map([
  ['pow', '화력'],
  ['hit', '명중'],
  ['dodge', '회피'],
  ['rate', '사속'],
  ['crit', '치명타 적중률'],
  ['cooldown', '쿨타임 감소율'],
]);

const rateOptions = [
  { value: 1, name: 1 },
  { value: 1.25, name: 2 },
  { value: 1.5, name: 3 },
  { value: 1.75, name: 4 },
  { value: 2, name: 5 },
];

class EffectBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rate: 2,
    };

    this.onChangeRate = this.onChangeRate.bind(this);
    this.renderSelector = this.renderSelector.bind(this);
  }

  onChangeRate(event) {
    const { value } = event.target;
    this.setState({
      rate: value,
    });
  }

  renderSelector() {
    if (!this.props.hasLevel) {
      return null;
    }

    return (
      <SmallSelector
        label="편제확대"
        values={rateOptions}
        selected={this.state.rate}
        onChange={this.onChangeRate}
      />
    );
  }

  render() {
    const { classes } = this.props;

    const grids = effectGridList.map((e) => {
      let type = classes.default;
      if (e[0] === this.props.effectCenter) {
        type = classes.center;
      } else if (this.props.effectPos.indexOf(e[0]) >= 0) {
        type = classes.effected;
      }
      return (
        <div key={e[0]} className={[classes.grid, type].join(' ')} style={e[1]} />
      );
    });

    console.log(this.props.effectType);
    const target = targetMap.get(this.props.effectType);
    const effects = Object.keys(this.props.gridEffect).map((key) => {
      const type = typeMap.get(key);
      const value = this.props.gridEffect[key];

      return `${type} 상승 ${this.props.hasLevel ? value * this.state.rate : value}%`;
    }).join(', ');

    return (
      <InfoBox name="진형버프" selector={this.renderSelector()}>
        <Grid className={classes.container} container>
          <Grid item xs={4}>
            <div className={classes.wrapper}>
              <Square>{grids}</Square>
            </div>
          </Grid>
          <Grid className={classes.explain} item xs>
            <Typography>
              버프칸의 <span className={classes.yellow}>{target}</span>에게 {effects}
            </Typography>
          </Grid>
        </Grid>
      </InfoBox>
    );
  }
}

export default withStyles(style)(EffectBox);
