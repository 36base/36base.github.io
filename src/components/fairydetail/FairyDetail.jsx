import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Grid } from 'material-ui';

import FairyRepository from '../../repositories/FairyRepository';

import StatusInfoBox from './components/StatusInfoBox';
import SkillBox from './components/SkillBox';
import SkinTabbar from './components/SkinTabbar';
import style from './components/style';

function timeToStr(time) {
  if (time === undefined || time === 0) {
    return '불가';
  }

  const hour = Math.floor(time / 3600);
  const min = (time / 60) % 60;
  return `${hour < 10 ? '0' : ''}${hour} : ${min < 10 ? '0' : ''}${min}`;
}

class FairyDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      info: undefined,
      skinNo: 0,
      // modLv: 1,
    };
    this.handleSkinChange = this.handleSkinChange.bind(this);
    // this.handleModChange = this.handleModChange.bind(this);
  }

  componentWillMount() {
    const id = Number(this.props.match.params.id);
    FairyRepository.fetchById(id)
      .then(info => this.setState({ info }));
  }

  // eslint-disable-next-line
  handleSkinChange(no) {
    const number = no - 2;// 왜 인지는 모르겠는데 no로 넘어오는숫자가 2,3,4입니다 그래서 일단은 이렇게 처리합니다.
    this.setState({ skinNo: number });
  }
  render() {
    const { classes } = this.props;
    const { info } = this.state;
    if (!info) {
      return (
        <div>Undefined</div>
      );
    }
    const skinImage = [info.images.mod1, info.images.mod2, info.images.mod3];
    return (
      <Grid className={classes.root}>
        <div className={classes.titleWrapper}>
          <div className={classes.nameWrapper}>
            <div className={classes.krName}>{ info.krName }</div>
            <div className={classes.name}>{ info.name }</div>
          </div>
          <div className={classes.number}>NO. { info.id }</div>
        </div>
        <div className={classes.divider} />
        <Grid container className={classes.contentWrapper}>
          <Grid item xs={6} className={classes.imageWrapper}>
            <SkinTabbar onChange={this.handleSkinChange} />
            <div className={classes.image}>
              <img
                className={classes.skinImage}
                alt={info.name}
                src={skinImage[this.state.skinNo]}
              />
            </div>
          </Grid>
          <Grid item xs={6} className={classes.infoWrapper}>
            <div className={classes.infoBox}>
              <div className={classes.infoTitle}>기본정보</div>
              <div className={classes.infoRow}>
                <div className={classes.rowTitle}>분류</div>
                <div>{ info.category }</div>
              </div>
              <div className={classes.infoRow}>
                <div className={classes.rowTitle}>제조시간</div>
                <div>{ timeToStr(info.buildTime) }</div>
              </div>
            </div>
            <StatusInfoBox grow={info.grow} stats={info.stats} id={info.id} />
            <SkillBox skill={info.skill} />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(style)(FairyDetail);
