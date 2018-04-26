import React from 'react';
import { withStyles } from 'material-ui/styles';

import FairyRepository from '../../repositories/FairyRepository';
import SkillBox from './components/SkillBox';
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
      modLv: 1,
      skillLv: 10,
    };

    this.handleSkillLvChange = this.handleSkillLvChange.bind(this);
    this.handleModChange = this.handleModChange.bind(this);
  }

  handleSkillLvChange(no) {
    this.setState({
      skillLv: no,
    });
  }

  handleModChange(no) {
    this.setState({
      modLv: no,
    });
  }

  componentWillMount() {
    const id = Number(this.props.match.params.id);

    FairyRepository.fetchById(id)
      .then(info => this.setState({ info }));
  }

  render() {
    const { classes } = this.props;

    const {
      info,
    } = this.state;

    if (!info) {
      return (
        <div>Undefined</div>
      );
    }


    /* TODO:컴포넌트 분리필요(04-11) */
    return (
      <div className={classes.root}>
        <div className={classes.titleWrapper}>
          <div className={classes.nameWrapper}>
            <div className={classes.krName}>{ info.krName }</div>
            <div className={classes.name}>{ info.name }</div>
          </div>
          <div className={classes.number}>NO. { info.id }</div>
        </div>
        <div className={classes.divider} />
        <div className={classes.contentWrapper}>
          <div className={classes.imageWrapper}>
            <div className={classes.image}><img alt={info.name} src={info.images.mod1} /></div>
          </div>
          <div className={classes.infoWrapper}>
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
            <div className={classes.infoBox}>
              <div className={classes.infoTitle}>스테이터스</div>
              <div className={classes.infoRow}>
                <div className={classes.rowTitle}>화력</div>
                <div>{ info.stats.pow}</div>
              </div>
              <div className={classes.infoRow}>
                <div className={classes.rowTitle}>회피</div>
                <div>{ info.stats.dodge}</div>
              </div>
              <div className={classes.infoRow}>
                <div className={classes.rowTitle}>장갑</div>
                <div>{ info.stats.armor}</div>
              </div>
              <div className={classes.infoRow}>
                <div className={classes.rowTitle}>치명상</div>
                <div>{ info.stats.critDmg}</div>
              </div>
              <div className={classes.infoRow}>
                <div className={classes.rowTitle}>명중</div>
                <div>{ info.stats.hit}</div>
              </div>
              <div className={classes.infoRow}>
                <div className={classes.rowTitle}>성장</div>
                <div>{ info.grow }</div>
              </div>
            </div>
            <SkillBox skill={info.skill} lv={1} />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(style)(FairyDetail);
