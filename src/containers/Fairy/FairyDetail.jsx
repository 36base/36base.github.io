import React from 'react';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { getFairyResourceUrl, getSkillIconUrl } from '../../utils/url';

import FairyRepository from '../../repositories/FairyRepository';

import StatusInfoBox from '../../components/fairydetail/components/StatusInfoBox';
import SkillBox from '../../components/fairydetail/components/SkillBox';
import SkinTabbar from '../../components/fairydetail/components/SkinTabbar';

import styles from './FairyDetailStyles';

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
    skinNo: 1,
  };

  componentWillMount() {
    const { match } = this.props;
    const id = Number(match.params.id);

    this.setState({ info: FairyRepository.getNewById(id) });
  }

  handleSkinChange = (no) => {
    const number = no;
    this.setState({ skinNo: number });
  }

  handleSkillChange = (level) => {
    this.setState(prevState => ({ info: Object.assign(prevState.info, { skillLevel: level }) }));
  }

  handleStatusChange = (level, qualityLevel) => {
    this.setState(prevState => ({ info: Object.assign(prevState.info, { level, qualityLevel }) }));
  }

  render() {
    const { t, classes } = this.props;
    const { info, skinNo } = this.state;
    if (!info) {
      return (
        <div>Undefined</div>
      );
    }
    nonCraftableText = t('Non-craftable');
    return (
      <Grid className={classes.root}>
        <div className={classes.titleWrapper}>
          <div className={classes.number}>
            {`NO. ${info.id} ${t(info.name)}`}
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
                src={getFairyResourceUrl(info.skins[skinNo - 1].codename)}
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
                <div>{timeToStr(info.buildTime)}</div>
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
              icon={getSkillIconUrl(info.skill.codename)}
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
  withStyles(styles),
)(FairyDetail);
