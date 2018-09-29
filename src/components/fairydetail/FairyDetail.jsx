import React from 'react';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import FairyRepository from '../../repositories/FairyRepository';

import StatusInfoBox from './components/StatusInfoBox';
import SkillBox from './components/SkillBox';
import SkinTabbar from './components/SkinTabbar';
import style from './components/style';

let nonCraftableText = '';

function timeToStr(time) {
  if (time === undefined || time === 0) {
    return nonCraftableText;
  }

  const hour = Math.floor(time / 3600);
  const min = (time / 60) % 60;
  return `${hour < 10 ? '0' : ''}${hour} : ${min < 10 ? '0' : ''}${min}`;
}

class FairyDetail extends React.Component {
  state = {
    info: undefined,
    skinNo: 0,
  };

  componentWillMount() {
    const { match } = this.props;
    const id = Number(match.params.id);
    FairyRepository.fetchById(id)
      .then((info) => {
        this.setState({ info });
      });
  }

  handleSkinChange = (no) => {
    const number = no - 2;// 왜 인지는 모르겠는데 no로 넘어오는숫자가 2,3,4입니다 그래서 일단은 이렇게 처리합니다.
    this.setState({ skinNo: number });
  }

  handleSkillChange = (level) => {
    this.setState(prevState => ({ info: Object.assign(prevState.info, { skillLevel: level }) }));
  }

  handleStatusChange = (level, qualityLevel) => {
    this.setState(prevState => ({ info: Object.assign(prevState.info, { level, qualityLevel }) }));
  }

  handleLanguageChange = (langName) => {
    const { classes } = this.props;
    const { info } = this.state;

    if (langName === 'ko-KR') {
      return (
        <div className={classes.nameWrapper}>
          <div className={classes.krName}>{ info.krName }</div>
          <div className={classes.name}>{ info.name }</div>
        </div>
      );
    }
    return (
      <div className={classes.nameWrapper}>
        <div className={classes.krName}>{ info.name }</div>
      </div>
    );
  }

  render() {
    const {
      classes, t, i18n,
    } = this.props;
    const { info, skinNo } = this.state;
    if (!info) {
      return (
        <div>Undefined</div>
      );
    }
    nonCraftableText = t('Non-craftable');
    const skinImage = [info.images.mod1, info.images.mod2, info.images.mod3];
    return (
      <Grid className={classes.root}>
        <div className={classes.titleWrapper}>
          { this.handleLanguageChange(i18n.language) }
          <div className={classes.number}>
            {'NO.'}
            {' '}
            { info.id }
          </div>
        </div>
        <div className={classes.divider} />
        <Grid container className={classes.contentWrapper}>
          <Grid item xs={6} className={classes.imageWrapper}>
            <SkinTabbar onChange={this.handleSkinChange} selected={skinNo} />
            <div className={classes.image}>
              <img
                className={classes.skinImage}
                alt={info.name}
                src={skinImage[skinNo]}
              />
            </div>
          </Grid>
          <Grid item xs={6} className={classes.infoWrapper}>
            <div className={classes.infoBox}>
              <div className={classes.infoTitle}>
                {t('Basic Information')}
              </div>
              <div className={classes.infoRow}>
                <div className={classes.rowTitle}>
                  {t('type')}
                </div>
                <div>{ info.category }</div>
              </div>
              <div className={classes.infoRow}>
                <div className={classes.rowTitle}>
                  {t('Production Time')}
                </div>
                <div>{ timeToStr(info.buildTime) }</div>
              </div>
            </div>
            <StatusInfoBox
              handler={this.handleStatusChange}
              stats={info.stats}
              grow={info.grow}
              default={{ level: info.level, qualityLevel: info.qualityLevel }}
            />
            <SkillBox
              handler={this.handleSkillChange}
              skill={info.skill}
              icon={info.skillIcon}
              default={{ level: info.skillLevel }}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default compose(
  translate(),
  withStyles(style),
)(FairyDetail);
