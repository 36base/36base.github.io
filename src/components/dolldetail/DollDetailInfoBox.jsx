import React from 'react';
import { Grid, Divider, Typography, List, ListItem, ListItemText } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import sd from './sd.png';
import { Box, Row } from './infobox/components';

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
    const { classes } = this.props;

    return (
      <div>
        <Box name="기본정보">
          <Row label="분류" value="Rifle" divider />
          <Row label="일러스트" value="受菟" divider />
          <Row label="성우" value="Ricca Tachibana" divider />
        </Box>

        <Box name="스테이터스">
          <Grid className={classes.row} container spacing={6}>
            <Grid item xs><Typography>체력</Typography></Grid>
            <Grid item xs><Typography>440</Typography></Grid>
            <Grid className={classes.statusBar} item xs={8} />
          </Grid>
          <Divider />
          <Grid className={classes.row} container spacing={6}>
            <Grid item xs><Typography>화력</Typography></Grid>
            <Grid item xs><Typography>115</Typography></Grid>
            <Grid className={classes.statusBar} item xs={8} />
          </Grid>
          <Divider />
          <Grid className={classes.row} container spacing={6}>
            <Grid item xs><Typography>명중</Typography></Grid>
            <Grid item xs><Typography>65</Typography></Grid>
            <Grid className={classes.statusBar} item xs={8} />
          </Grid>
          <Divider />
          <Grid className={classes.row} container spacing={6}>
            <Grid item xs><Typography>회피</Typography></Grid>
            <Grid item xs><Typography>27</Typography></Grid>
            <Grid className={classes.statusBar} item xs={8} />
          </Grid>
          <Divider />
          <Grid className={classes.row} container spacing={6}>
            <Grid item xs><Typography>사속</Typography></Grid>
            <Grid item xs><Typography>39</Typography></Grid>
            <Grid className={classes.statusBar} item xs={8} />
          </Grid>
          <Divider />
        </Box>

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

        <Box name="획득처">
          <Row label="제조" value="불가" divider />
          <Row label="일반 전역" value="불가" divider />
          <Row label="이벤트 전역" value="저체온증 1-2, 저체온증 1-3, 저체온증 3-3" divider />
        </Box>
      </div>
    );
  }
}

export default withStyles(style)(DollDetailInfoBox);
