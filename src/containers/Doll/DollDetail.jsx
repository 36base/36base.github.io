import React, { Component } from 'react';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
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
import { loadDollSpine } from '../../utils/spine/SpineLoader';
import { getDollResourceUrl } from '../../utils/url';

import styles from './DollDetailStyles';

class DollDetail extends Component {
  state = {
    info: null,
    skeleton: undefined,
    hasMod: false,
    selected: {
      skinCode: 0,
      skinType: 'normal',
      sdType: 'battle',
    },
  };

  componentWillMount() {
    const { match } = this.props;
    const dollId = Number(match.params.id);

    this.load(dollId);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    const { match } = nextProps;
    const dollId = Number(match.params.id);

    this.load(dollId);
  }

  load = (dollId) => {
    const info = DollRepository.getNewById(dollId);

    if (info) {
      this.setState({
        info,
        hasMod: (dollId < 20000 && DollRepository.getNewById(dollId + 20000)),
      });

      const { selected: { sdType } } = this.state;

      loadDollSpine(
        info.codename,
        0,
        sdType,
      ).then(skeleton => this.setState({ skeleton }));
    }
  }

  handleSkinChange = (newSelectedSkinCode) => {
    const {
      info: { codename },
      selected: { sdType },
    } = this.state;

    loadDollSpine(
      codename,
      newSelectedSkinCode,
      sdType,
    ).then(skeleton => this.setState({ skeleton }));

    this.setState(prevState => ({
      selected: {
        ...prevState.selected,
        skinCode: newSelectedSkinCode,
      },
    }));
  }

  toggleSkinType = () => {
    this.setState(prevState => ({
      selected: {
        ...prevState.selected,
        skinType: prevState.selected.skinType === 'normal' ? 'damaged' : 'normal',
      },
    }));
  }

  toggleSdType = () => {
    this.setState(prevState => ({
      selected: {
        ...prevState.selected,
        sdType: prevState.selected.sdType === 'battle' ? 'stay' : 'battle',
      },
    }), () => {
      const {
        info: { codename },
        selected: {
          skinCode,
          sdType,
        },
      } = this.state;

      loadDollSpine(
        codename,
        skinCode,
        sdType,
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
      skeleton,
      hasMod,
      selected: {
        skinCode,
        skinType,
      },
    } = this.state;

    if (!info) return (<div />);

    const extra = t(info.extra).split(',');

    let color = '#505694';

    switch (info.rank.starCnt) {
      case 2: color = '#787878'; break;
      case 3: color = '#2e5770'; break;
      case 4: color = '#7e8644'; break;
      case 5: color = (info.rank.name === 'Extra') ? '#505694' : '#a97744'; break;
      default: color = '#505694';
    }

    const { getScript } = gfextradata({ locale: i18n.language });

    const script = getScript ? getScript(info.codename, skinCode) : { error: ['girlsfrontline-extra-data 모듈에서 문제가 발생했습니다. 관리자에게 문의해주세요.'] };

    return (
      <div className={classes.wrapper}>
        <Background color={color} />
        <div className={classes.header}>
          <Grid container>
            <Caption name={t(info.name)} />
            <NumberBox id={info.id % 1000} />
            <Grid container className={classes.titleLine}>
              <HorizonLine height={3} />
            </Grid>
            <Grid container>
              <Grid item xs={8} md={10}>
                <SkinTabbar
                  selected={skinCode}
                  skins={[{ id: 0, name: 'PageMessage.Doll.Default' }, ...info.skins].map((e) => {
                    const name = t(e.name);

                    return {
                      id: e.id,
                      name: (name.lastIndexOf('-') !== -1) ? name.substr(name.lastIndexOf('-') + 1) : name,
                    };
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
          <Illust src={getDollResourceUrl(info.codename, skinType, { skin: skinCode })} />
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
              <Link className={classes.button} to={`${info.id + 20000}`}>{t('PageMessage.Doll.MOD Ver Link')}</Link>
            </Grid>
          )}
          {info.id > 20000 && (
            <Grid className={classes.boxWrapper} item xs={12}>
              <Link className={classes.button} to={`${info.id - 20000}`}>{t('PageMessage.Doll.NON-MOD Ver Link')}</Link>
            </Grid>
          )}
          <Grid className={classes.boxWrapper} item xs={12}>
            <SDBox
              width={500}
              height={400}
              skeleton={skeleton}
              toggleStayingHandler={this.toggleSdType}
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
