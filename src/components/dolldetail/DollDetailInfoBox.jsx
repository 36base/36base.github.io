import React from 'react';
import { Grid, Divider, Typography, List, ListItem, ListItemText } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import sd from './sd.png';
import { Box, Row, StatusRow } from './infobox/components';

function makeDurationString(time) {
  const hour = Math.floor(time / 360);
  const min = (time / 60) % 60;

  return `${hour < 10 ? '0' : ''}${hour} : ${min < 10 ? '0' : ''}${min}`;
}

const style = {
  box: {
    minWidth: 200,
    maxWidth: 400,
    marginBottom: 50,
  },
  row: {
    padding: '5px 0',
  },
  statusBar: {
    borderRadius: 10,
    border: '1px solid grey',
    background: 'linear-gradient(to right, red 60%, transparent 60%)',
  },
  green: {
    backgroundColor: 'green',
  },
  buffSquare: {
    border: '1px solid grey',
    backgroundColor: '#EAEAEA',
  },
  buffWhite: {
    border: '1px solid grey',
    backgroundColor: 'white',
  },
  buffCyan: {
    border: '1px solid grey',
    backgroundColor: 'cyan',
  },
  yellowSpan: {
    color: '#FDA50C',
  },
};

class DollDetailInfoBox extends React.Component {
  render() {
    const { classes, info } = this.props;

    const basicInfoBox = (
      <Box name="기본정보">
        <Row label="분류" value={info.typeName} divider />
        <Row label="일러스트" value="정보없음" divider />
        <Row label="성우" value={info.voice} divider />
      </Box>
    );

    const statusBox = (
      <Box name="스테이터스">
        <StatusRow color="red" divider label="체력" value={info.stats.hp} maxValue={300} />
        <StatusRow color="red" divider label="화력" value={info.stats.pow} maxValue={200} />
        <StatusRow color="red" divider label="명중" value={info.stats.hit} maxValue={100} />
        <StatusRow color="red" divider label="회피" value={info.stats.dodge} maxValue={150} />
        <StatusRow color="red" divider label="사속" value={info.stats.rate} maxValue={120} />
      </Box>
    );

    const gainSpots = (
      <Box name="획득처">
        <Row label="제조" value={makeDurationString(info.buildTime)} divider />
        <Row label="일반 전역" value={info.drop.join(',')} divider />
        <Row label="이벤트 전역" value="불가" divider />
      </Box>
    );

    return (
      <div>
        {basicInfoBox}
        {statusBox}
        <Box name="SD">
          <Grid container spacing={6}>
            <Grid item xs={8} >
              <div style={{ width: '100%', height: '100%', backgroundImage: `url(${sd})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
            </Grid>
            <Grid item xs={4}>
              <List component="ul" >
                <ListItem button><ListItemText primary="대기" /></ListItem>
                <ListItem button><ListItemText primary="이동" /></ListItem>
                <ListItem button><ListItemText primary="공격" /></ListItem>
                <ListItem button><ListItemText primary="사망" /></ListItem>
                <ListItem button><ListItemText primary="승리" /></ListItem>
              </List>
            </Grid>
          </Grid>
        </Box>
        
        <Box name="스킬">
          <Grid item xs={12}>
            <Typography variant="body">
              <span>목표제거</span>
              <span>초기 쿨타임</span><span className={classes.yellowSpan}>10초</span>/
              <span>쿨타임</span><span className={classes.yellowSpan}>16초</span>
              1.5초간 조준 후, 특정한 타깃에게 공격력의 5.5배 피해를 입힌다.
            </Typography>
          </Grid>
        </Box>
        
        <Box name="진형버프">
          <Grid container>
            <Grid item xs={8}>
              <Grid container>
                <Grid className={classes.buffSquare} item xs={4} />
                <Grid className={classes.buffSquare} item xs={4} />
                <Grid className={classes.buffCyan} item xs={4} />
                <Grid className={classes.buffSquare} item xs={4} />
                <Grid className={classes.buffWhite} item xs={4} />
                <Grid className={classes.buffSquare} item xs={4} />
                <Grid className={classes.buffSquare} item xs={4} />
                <Grid className={classes.buffSquare} item xs={4} />
                <Grid className={classes.buffSquare} item xs={4} />
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Typography>
                버프칸의 <span className={classes.yellowSpan}>권총</span>에게 쿨타임 감소율 상승 12%
              </Typography>
            </Grid>
          </Grid>
        </Box>
        {gainSpots}
      </div>
    );
  }
}

export default withStyles(style)(DollDetailInfoBox);
