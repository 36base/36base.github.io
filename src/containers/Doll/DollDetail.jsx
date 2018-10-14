import React, { Component } from 'react';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import gfextradata from 'girlsfrontline-extra-data';

import HorizonLine from '../../components/common/HorizonLine';
import Background from '../../components/dolldetail/components/Background';
import Caption from '../../components/dolldetail/components/Caption';
import NumberBox from '../../components/dolldetail/components/NumberBox';
import SkinTabbar from '../../components/dolldetail/components/SkinTabbar';
import StarBox from '../../components/dolldetail/components/StarBox';
import TypeSwitchBox from '../../components/dolldetail/components/TypeSwitchBox';
import Illust from '../../components/dolldetail/components/Illust';
import BasicInfoBox from '../../components/dolldetail/components/BasicInfoBox';
import StatusInfoBox from '../../components/dolldetail/components/StatusInfoBox';
import SDBox from '../../components/dolldetail/components/SDBox';
import SkillBox from '../../components/dolldetail/components/SkillBox';
import EffectBox from '../../components/dolldetail/components/EffectBox';
import AcquisitionInfoBox from '../../components/dolldetail/components/AcquisitionInfoBox';
import IntroduceBox from '../../components/dolldetail/components/IntroduceBox';
import ScriptBox from '../../components/dolldetail/components/ScriptBox';

import DollRepository from '../../repositories/DollRepository';
import SpineLoader from '../../utils/spine/SpineLoader';

import getDollSpine from '../../utils/spine/getDollSpine';

import { getDollResourceUrl } from '../../utils/url';

import styles from './DollDetailStyles';

class DollDetail extends Component {
  state = {
    info: undefined,
    images: undefined,
    // skeleton: undefined,
    hasMod: false,
    isSdStaying: false,
    skinCode: 0,
    skinNo: 0,
    skinType: 'normal',
  };

  componentWillMount() {
    const { match } = this.props;
    const dollId = Number(match.params.id);

    this.setState({ info: DollRepository.getNewById(dollId) }, () => {
      const { info } = this.state;
      const {
        id,
        codename,
        skins,
      } = info;

      const spine = getDollSpine(id);
      const spineNames = spine ? Object.keys(spine.names) : Array(skins.length + 1);
      const base = {
        id: 0,
        name: 'PageMessage.Doll.Default',
        spineCode: spineNames[0],
        normal: getDollResourceUrl(codename, 'normal'),
        damaged: getDollResourceUrl(codename, 'damaged'),
      };

      const images = [
        base,
        ...((info.id < 20000) ? (skins.map((e, i) => ({
          id: e.id,
          name: e.name,
          spineCode: spineNames[i + 1],
          normal: getDollResourceUrl(codename, 'normal', { skin: e.id }),
          damaged: getDollResourceUrl(codename, 'damaged', { skin: e.id }),
        }))) : []),
      ];
      this.setState({ images });
    });
    /*
    if (id < 20000) {
      DollRepository.fetchById(id + 20000)
        .then((info) => {
          if (info) this.setState({ hasMod: true });
        });
    }
    */
    SpineLoader.loadDefaultSpine(dollId)
      .then(skeleton => this.setState({ skeleton }));
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleSkinChange = (no) => {
    const {
      info: { id },
      images,
      isSdStaying,
    } = this.state;

    SpineLoader.loadSpine(
      (id > 20000 && no !== 0) ? id - 20000 : id,
      images[no].id,
      isSdStaying,
    ).then(skeleton => this.setState({ skeleton }));

    this.setState({
      skinNo: no,
      skinCode: images[no].id,
    });
  }

  toggleSkinType = () => {
    this.setState(prevState => ({
      skinType: prevState.skinType === 'normal' ? 'damaged' : 'normal',
    }));
  }

  toggleSdStaying = () => {
    this.setState(prevState => ({ isSdStaying: !(prevState.isSdStaying) }), () => {
      const {
        info: { id },
        images,
        skinNo,
        isSdStaying,
      } = this.state;

      SpineLoader.loadSpine(
        (id > 20000 && skinNo !== 0) ? id - 20000 : id,
        images[skinNo].id,
        isSdStaying,
      ).then(skeleton => this.setState({ skeleton }));
    });
  }

  handleStatusChange = (level, favor) => {
    this.setState(prevState => ({ info: Object.assign(prevState.info, { level, favor }) }));
  }

  handleSkillLvChange = (level) => {
    this.setState(prevState => ({ info: Object.assign(prevState.info, { skillLevel: level }) }));
  }

  handleSkill2LvChange = (level) => {
    this.setState(prevState => ({ info: Object.assign(prevState.info, { skillLevel2: level }) }));
  }

  render() {
    const { classes, t, i18n } = this.props;
    const {
      info,
      images,
      skeleton,
      skinNo,
      skinCode,
      skinType,
      hasMod,
      isSdStaying,
    } = this.state;

    if (info === undefined || images === undefined) return (<div />);

    const extra = t(info.extra).split(',');

    let color = '#505694';

    switch (info.rank.starCnt) {
      case 2: color = '#787878'; break;
      case 3: color = '#2e5770'; break;
      case 4: color = '#7e8644'; break;
      case 5: color = (info.rank.name === 'Extra') ? '#505694' : '#a97744'; break;
      default: color = '#505694';
    }

    const { script: DollScript } = gfextradata({ locale: i18n.language });

    let script = DollScript[info.codename];

    if (parseInt(skinCode / 100, 10) === 9) { // 아동절 스킨 대사
      script = DollScript[`${info.codename}_0`];
    }
    console.log(script);

    return (
      <div className={classes.wrapper}>
        <Background color={color} />
        <div className={classes.header}>
          <Grid container>
            <Caption name={t(info.name)} />
            <NumberBox id={info.id < 20000 ? info.id : info.id - 20000} />
            <Grid container className={classes.titleLine}>
              <HorizonLine height={3} />
            </Grid>
            <Grid container>
              <Grid item xs={8} md={10}>
                <SkinTabbar
                  selected={skinNo}
                  skins={images.map((item) => {
                    const name = t(item.name);
                    return { id: item.id, name: (name.lastIndexOf('-') !== -1) ? name.substr(name.lastIndexOf('-') + 1) : name };
                  })}
                  onChange={this.handleSkinChange}
                />
              </Grid>
              <Grid item xs={4} md={2}><StarBox count={info.rank.starCnt} /></Grid>
            </Grid>
          </Grid>
        </div>
        <div className={classes.img}>
          <TypeSwitchBox on={skinType === 'damaged'} toggle={this.toggleSkinType} />
          <Illust src={images[skinNo][skinType]} />
        </div>
        <div className={classes.info}>
          <Grid className={classes.boxWrapper} item xs={12}>
            <BasicInfoBox
              armType={t(info.type)}
              illust={t(extra[0])}
              voice={t(extra[1])}
            />
          </Grid>
          <Grid className={classes.boxWrapper} item xs={12}>
            <StatusInfoBox
              id={info.id}
              stats={info.stats}
              handler={this.handleStatusChange}
            />
          </Grid>
          {hasMod && (
          <Grid className={classes.boxWrapper} item xs={12}>
            <a href={info.id + 20000} className={classes.button}>
              {t('PageMessage.Doll.MOD Ver Link')}
            </a>
          </Grid>
          )}
          {info.id > 20000 && (
          <Grid className={classes.boxWrapper} item xs={12}>
            <a href={info.id - 20000} className={classes.button}>
              {t('PageMessage.Doll.NON-MOD Ver Link')}
            </a>
          </Grid>
          )}
          <Grid className={classes.boxWrapper} item xs={12}>
            <SDBox
              width={250}
              height={350}
              skeleton={skeleton}
              toggleStayingHandler={this.toggleSdStaying}
              isStaying={isSdStaying}
            />
          </Grid>
          <Grid className={classes.boxWrapper} item xs={12}>
            <SkillBox
              skill={info.skill1}
              skillLevel={info.skillLevel}
              onChange={this.handleSkillLvChange}
            />
          </Grid>
          <Grid className={classes.boxWrapper} item xs={12} />
          <Grid className={classes.boxWrapper} item xs={12}>
            {info.skill2 && (
            <SkillBox
              skill={info.skill2}
              skillLevel={info.skillLevel2}
              onChange={this.handleSkill2LvChange}
            />
            )}
          </Grid>
          <Grid className={classes.boxWrapper} item xs={12}>
            <EffectBox {...info.effect} hasLevel={info.type.code === 'hg'} />
          </Grid>
          <Grid className={classes.boxWrapper} item xs={12}>
            <AcquisitionInfoBox
              buildTime={info.buildTime}
              obtain={info.obtain.map(item => ({ id: item.id, description: t(item.description) }))}
            />
          </Grid>
          <Grid className={classes.boxWrapper} item xs={12}>
            <IntroduceBox script={script} />
          </Grid>
          <Grid className={classes.boxWrapper} item xs={12}>
            <ScriptBox script={script} />
          </Grid>
        </div>
      </div>
    );
  }
}

export default compose(
  translate(),
  withStyles(styles),
)(DollDetail);
