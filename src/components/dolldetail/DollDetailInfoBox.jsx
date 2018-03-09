import React from 'react';
import { Grid, Typography, ListItemIcon, Icon, ListItem, ListItemText } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import sd from './sd.png';
import { Box, Row, StatusRow } from './infobox/components';

function makeDurationString(time) {
  if (time === undefined || time === 0) {
    return '불가';
  }

  const hour = Math.floor(time / 3600);
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
    height: 0,
    paddingBottom: '100%',
    border: '1px solid grey',
    backgroundColor: '#EAEAEA',
  },
  buffWhite: {
    height: 0,
    paddingBottom: '100%',
    border: '1px solid grey',
    backgroundColor: 'white',
  },
  buffCyan: {
    height: 0,
    paddingBottom: '100%',
    border: '1px solid grey',
    backgroundColor: 'cyan',
  },
  yellowSpan: {
    color: '#FDA50C',
  },
  square: {
    width: '100%',
    maxWidth: 180,
    margin: '0 auto',
  },
  square2: {
    position: 'relative',
    width: '100%',
    height: 0,
    paddingBottom: '100%',
    borderTop: '1px solid grey',
    borderLeft: '1px solid grey',
  },
  buffRow: {
    width: '100%',
    height: '33.3%',
  },
  rowDivider: {
    width: '100%',
    height: 1,
    backgroundColor: 'grey',
  },
  boxContainer: {
    margin: '8px 0',
  },
  noPadding: {
    padding: '8px 0',
  },
  icon: {
    margin: 'auto 0',
    marginLeft: 8,
  },
  bottom: {
    display: 'flex',
    padding: 0,
    flexDirection: 'column-reverse',
  }
};

class DollDetailInfoBox extends React.Component {
  render() {
    const { classes, info } = this.props;

    const basicInfoBox = (
      <Box name="기본정보" bottomLine >
        <Row label="분류" value={info.typeName} />
        <Row label="일러스트" value="정보없음" />
        <Row label="성우" value={info.voice} />
      </Box>
    );

    const statusBox = (
      <Box name="스테이터스" bottomLine >
        <StatusRow color="red" label="체력" value={info.stats.hp} maxValue={300} />
        <StatusRow color="red" label="화력" value={info.stats.pow} maxValue={200} />
        <StatusRow color="red" label="명중" value={info.stats.hit} maxValue={100} />
        <StatusRow color="red" label="회피" value={info.stats.dodge} maxValue={150} />
        <StatusRow color="red" label="사속" value={info.stats.rate} maxValue={120} />
      </Box>
    );

    const gainSpots = (
      <Box name="획득처" bottomLine >
        <Row label="제조" value={makeDurationString(info.buildTime)} />
        <Row label="일반 전역" value={info.drop.join(',')} />
        <Row label="이벤트 전역" value="불가" />
      </Box>
    );

    return (
      <div>
        {basicInfoBox}
        {statusBox}
        <Box name="SD">
          <Grid className={classes.boxContainer} container>
            <Grid item xs={8} >
              <div style={{ width: '100%', height: '100%', backgroundImage: `url(${sd})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
            </Grid>
            <Grid item xs={4} component="ul">
              <ListItem className={classes.noPadding} button component="li">
                <ListItemIcon className={classes.icon}><Icon className="fa fa-lg fa-check" /></ListItemIcon>
                <ListItemText primary="대기" />
              </ListItem>
              <ListItem className={classes.noPadding} button component="li">
                <ListItemIcon className={classes.icon}><Icon /></ListItemIcon>
                <ListItemText primary="이동" />
              </ListItem>
              <ListItem className={classes.noPadding} button component="li">
                <ListItemIcon className={classes.icon}><Icon /></ListItemIcon>
                <ListItemText primary="공격" />
              </ListItem>
              <ListItem className={classes.noPadding} button component="li">
                <ListItemIcon className={classes.icon}><Icon /></ListItemIcon>
                <ListItemText primary="사망" />
              </ListItem>
              <ListItem className={classes.noPadding} button component="li">
                <ListItemIcon className={classes.icon}><Icon /></ListItemIcon>
                <ListItemText primary="승리" />
              </ListItem>
            </Grid>
          </Grid>
        </Box>

        <Box padding name="스킬">
          <Grid className={classes.boxContainer} container>
            <Grid item xs={6}>
              <Typography className={classes.skillName} variant="display3">목표제거</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.skillColldown} variant="body1">초기 쿨타임<span className={classes.yellowSpan}>10초</span></Typography>
              <Typography className={classes.skillColldown} variant="body1">쿨타임<span className={classes.yellowSpan}>16초</span></Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="p">
                1.5초간 조준 후, 특정한 타깃에게 공격력의 5.5배 피해를 입힌다.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box name="진형버프">
          <Grid className={classes.boxContainer} container>
            <Grid item xs={8}>
              <Grid className={classes.square} container>
                <div className={classes.square2} >
                  <div style={{position: 'absolute', left: 0, top: 0, width: '33.33%', height: '33.33%', borderRight: '1px solid grey', borderBottom: '1px solid grey', backgroundColor: '#EAEAEA'}} />
                  <div style={{position: 'absolute', left: '33.33%', top: 0, width: '33.33%', height: '33.33%', borderRight: '1px solid grey', borderBottom: '1px solid grey', backgroundColor: '#EAEAEA'}} />
                  <div style={{position: 'absolute', left: '66.66%', top: 0, width: '33.33%', height: '33.33%', borderRight: '1px solid grey', borderBottom: '1px solid grey', backgroundColor: '#80DEEA'}} />
                  <div style={{position: 'absolute', left: 0, top: '33.33%', width: '33.33%', height: '33.33%', borderRight: '1px solid grey', borderBottom: '1px solid grey', backgroundColor: '#EAEAEA'}} />
                  <div style={{position: 'absolute', left: '33.33%', top: '33.33%', width: '33.33%', height: '33.33%', borderRight: '1px solid grey', borderBottom: '1px solid grey', backgroundColor: 'white'}} />
                  <div style={{position: 'absolute', left: '66.66%', top: '33.33%', width: '33.33%', height: '33.33%', borderRight: '1px solid grey', borderBottom: '1px solid grey', backgroundColor: '#EAEAEA'}} />
                  <div style={{position: 'absolute', left: 0, top: '66.66%', width: '33.33%', height: '33.33%', borderRight: '1px solid grey', borderBottom: '1px solid grey', backgroundColor: '#EAEAEA'}} />
                  <div style={{position: 'absolute', left: '33.33%', top: '66.66%', width: '33.33%', height: '33.33%', borderRight: '1px solid grey', borderBottom: '1px solid grey', backgroundColor: '#EAEAEA'}} />
                  <div style={{position: 'absolute', left: '66.66%', top: '66.66%', width: '33.33%', height: '33.33%', borderRight: '1px solid grey', borderBottom: '1px solid grey', backgroundColor: '#EAEAEA'}} />
                </div>
              </Grid>
            </Grid>
            <Grid className={classes.bottom} item xs={4}>
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
