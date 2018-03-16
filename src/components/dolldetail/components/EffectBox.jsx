import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import InfoBox from '../../common/InfoBox';
import Square from '../../common/Square';

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
  alignBottom: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
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
  [0, '모든 인형'],
  [1, '권총'],
  [2, '기관단총'],
  [3, '소총'],
  [4, '돌격소총'],
  [5, '기관총'],
  [6, '산탄총'],
]);
const typeMap = new Map([
  ['pow', '화력'],
  ['hit', '명중'],
  ['dodge', '회피'],
  ['rate', '사속'],
  ['crit', '치명타 적중률'],
  ['coolDown', '쿨타임 감소율'],
]);

const EffectBox = (props) => {
  const { classes } = props;

  const grids = effectGridList.map((e) => {
    let type = classes.default;
    if (e[0] === props.effectCenter) {
      type = classes.center;
    } else if (props.effectPos.indexOf(e[0]) >= 0) {
      type = classes.effected;
    }
    return (
      <div key={e[0]} className={[classes.grid, type].join(' ')} style={e[1]} />
    );
  });

  const target = targetMap.get(props.effectType);
  const effects = Object.keys(props.gridEffect).map((key) => {
    const type = typeMap.get(key);
    const value = props.gridEffect[key];

    return `${type} 상승 ${value}%`;
  }).join(', ');

  return (
    <InfoBox name="진형버프">
      <Grid className={classes.container} container>
        <Grid item xs={4}>
          <div className={classes.wrapper}>
            <Square>{grids}</Square>
          </div>
        </Grid>
        <Grid className={classes.alignBottom} item xs>
          <Typography>
            버프칸의 <span className={classes.yellow}>{target}</span>에게 {effects}
          </Typography>
        </Grid>
      </Grid>
    </InfoBox>
  );
};

const stateMapper = state => state.dolldetail.mounted.effect;

export default connect(stateMapper)(withStyles(style)(EffectBox));
