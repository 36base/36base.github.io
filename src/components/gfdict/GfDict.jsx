import React from 'react';
import { Grid, Button, Paper } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';

const style = theme => ({
  wrapper: {
    marginTop: '1em',
  },
  forDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  forMobile: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  navigation: {
    marginBottom: '20px',
  },
  button: {
    fontSize: '0.9em',
    padding: '5px',
    margin: '5px',
  },
  content: {

  },
});

const datas = [
  '군수지원 효율표',
  '레벨링 루트 (합본)',
  '요정 제조 시간표',
  '인형 제조 시간표',
  '인형 제조식',
  '장비 제조 시간표',
];

class GfDict extends React.Component {
  state = {
    selected: null || datas[0],
  };

  onChange(item) {
    this.setState({ selected: item });
  }

  render() {
    const { classes } = this.props;
    const { selected } = this.state;

    return (
      <div className={classes.wrapper} align="center">
        <Grid container align="center" justify="center">
          <Grid item>
            <Paper
              align="center"
              style={{
                padding: '30px',
                minHeight: '300px',
              }}
            >
              <div className={classes.navigation}>
                <div className={classes.forMobile}>
                  <p>링크 클릭시 이미지 탭이 나타납니다</p>
                  {datas.map(item => (
                    <div style={{ padding: '10px', margin: '10px' }}>
                      <a
                        href={`https://girlsfrontline.kr/data/GFS/[소전사전] ${item}.png`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: 'blue', fontSize: '1.2em' }}
                      >
                        {item}
                      </a>
                    </div>
                  ))}
                </div>
                <div className={classes.forDesktop}>
                  {datas.map(item => (
                    <Button
                      key={item}
                      className={classes.button}
                      variant="raised"
                      color={item === selected ? 'primary' : 'default'}
                      onClick={() => this.onChange(item)}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </div>
              <div className={`${classes.content} ${classes.forDesktop}`}>
                {selected !== null ? (
                  <div>
                    <a
                      className={classes.forMobile}
                      href={`https://girlsfrontline.kr/data/GFS/[소전사전] ${selected}.png`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: 'none',
                        marginTop: '10px',
                        marginBottom: '30px',
                      }}
                    >
                      이미지가 제대로 보이지 않을 시 클릭
                    </a>
                    <img src={`https://girlsfrontline.kr/data/GFS/[소전사전] ${selected}.png`} alt={selected} />
                  </div>
                ) : <div />}
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(style)(GfDict);
