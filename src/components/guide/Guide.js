import React from 'react';
import { Grid, Button, Paper } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import * as Assets from './assets';

const style = theme => ({
  wrapper: {
    marginTop: '1em',
  },
  contentWrapper: {
    padding: '30px',
    minHeight: '300px',
    [theme.breakpoints.down('sm')]: {
      padding: '30px 0',
    },
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
  imageWrapper: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  image: {
    width: '580px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
});

const datas = [
  '소개',
  '초보 추천 인형',
  '제대 편성',
  '전술인형',
  '작전임무',
  '인형 육성',
  '장비, 요정, 중장비제대',
];

const imageDatas = [
  [Assets.g00],
  [Assets.g01],
  [Assets.g02_1, Assets.g02_2],
  [Assets.g03],
  [Assets.g04_1, Assets.g04_2],
  [Assets.g05_1, Assets.g05_2],
  [Assets.g06_1, Assets.g06_2],
];

class Guide extends React.Component {
  state = {
    selected: null || datas[0],
    selectedIndex: 0, // temp
  };

  onChange(item, index) {
    this.setState({ selected: item, selectedIndex: index });
  }

  render() {
    const { classes } = this.props;
    const { selected, selectedIndex } = this.state;

    return (
      <div className={classes.wrapper} align="center">
        <Grid container align="center" justify="center">
          <Grid item>
            <Paper
              align="center"
              className={classes.contentWrapper}
            >
              <div className={classes.navigation}>
                <div>
                  {datas.map((item, index) => (
                    <Button
                      key={item}
                      className={classes.button}
                      variant="raised"
                      color={item === selected ? 'primary' : 'default'}
                      onClick={() => this.onChange(item, index)}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </div>
              <div className={`${classes.content}`}>
                {selected !== null ? (
                  <div className={classes.imageWrapper}>
                    {
                      imageDatas[selectedIndex].map(item => (
                        <img className={classes.image} src={item} alt={selected} />
                      ))
                    }
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

export default withStyles(style)(Guide);
