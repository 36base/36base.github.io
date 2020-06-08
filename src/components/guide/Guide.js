import React from 'react';
import { compose } from 'redux';
import { Grid, Button, Paper } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import { translate } from 'react-i18next';

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
  '숙소 및 탐색 시스템',
  '군수지원 및 기타 정보',
];

const imageDatas = [
  [3],
  [4],
  [5, 6],
  [7],
  [8, 9],
  [10, 11],
  [12, 13],
  [14],
  [15],
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
    const { classes, t } = this.props;
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
                      {t(`PageMessage.Guide.${item}`)}
                    </Button>
                  ))}
                </div>
              </div>
              <div className={`${classes.content}`}>
                {selected !== null ? (
                  <div className={classes.imageWrapper}>
                    {
                      imageDatas[selectedIndex].map(item => (
                        <img className={classes.image} src={encodeURI(`https://girlsfrontline.kr/data/UserGuide/${t('PageMessage.Guide.GF Guide Url')}${item}.png`)} alt={selected} />
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

export default compose(
  translate(),
  withStyles(style),
)(Guide);
