import React from 'react';
import { Grid, Paper } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';

const style = theme => ({
  wrapper: {
    marginTop: '1em',
  },
  forDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  forMobile: {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class About extends React.Component {
  render() {
    const { classes } = this.props;
    const dataArr = [
      '군수지원 효율표',
      '레벨링 루트 (1)',
      '레벨링 루트 (2)',
      '요정 제조 시간표',
      '인형 제조 시간표',
      '인형 제조식',
      '장비 제조 시간표',
    ];

    const renderItem = (name) => {
      const item = (
        <div id={name}>
          <div className={classes.forDesktop}>
            <h3>{name}</h3>
          </div>
          <div className={classes.forMobile}>
            <a href={`https://girlsfrontline.kr/data/GFS/[소전사전] ${name}.png`} targer="_blank" style={{ textDecoration: 'none', color: 'blue' }}>
              <h3>{name}</h3>
            </a>
          </div>
          <img className={classes.forDesktop} src={`https://girlsfrontline.kr/data/GFS/[소전사전] ${name}.png`} alt={name} />
        </div>
      );
      return item;
    };

    return (
      <div className={classes.wrapper} align="center">
        <Grid container align="center" justify="center">
          <Paper className={classes.forDesktop} align="left" style={{ padding: '10px', height: '500px', marginRight: '20px' }}>
            <p>클릭시 해당 위치로 이동합니다</p>
            <div>
              {dataArr.map(iter => (
                <div style={{ padding: '10px', margin: '10px' }}>
                  <a href={`#${iter}`} style={{ textDecoration: 'none', color: 'blue', fontSize: '1.2em' }}>{iter}</a>
                </div>
              ))}
            </div>
          </Paper>
          <Paper align="left" style={{ padding: '20px', textAlign: 'center' }}>
            <br />
            <p className={classes.forMobile}>클릭시 이미지가 나타납니다</p>
            {dataArr.map(iter => renderItem(iter))}
          </Paper>
        </Grid>
      </div>
    );
  }
}

export default withStyles(style)(About);
