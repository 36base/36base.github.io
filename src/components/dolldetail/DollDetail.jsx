import React from 'react';
import { Grid } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import HorizonLine from '../common/HorizonLine';
import Background from './components/Background';
import Caption from './components/Caption';
import NumberBox from './components/NumberBox';
import SkinTabbar from './components/SkinTabbar';
import StarBox from './components/StarBox';
import TypeSwitchBox from './components/TypeSwitchBox';
import Illust from './components/Illust';
import BasicInfoBox from './components/BasicInfoBox';
import StatusInfoBox from './components/StatusInfoBox';
// import SDBox from './components/SDBox';
import SkillBox from './components/SkillBox';
import EffectBox from './components/EffectBox';
import AcquisitionInfoBox from './components/AcquisitionInfoBox';

import DollRepository from '../../repositories/DollRepository';
// import SpineRepository from '../../repositories/SpineRepository';

const style = theme => ({
  wrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  header: {
    paddingTop: '2%',
    height: '13%',
    paddingRight: 25,
  },
  titleLine: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  img: {
    verticalAlign: 'top',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '0 auto',
    },
    [theme.breakpoints.up('md')]: {
      display: 'inline-block',
      width: '70vh',
      height: `calc(100vh - 15% - ${theme.mixins.toolbar.minHeight}px)`,
    },
  },
  info: {
    [theme.breakpoints.up('md')]: {
      display: 'inline-block',
      width: 'calc(100% - 70vh)',
      height: '85%',
      overflow: 'auto',
    },
  },
  boxWrapper: {
    minWidth: 200,
    marginBottom: 36,
    [theme.breakpoints.down('sm')]: {
      maxWidth: '90%',
      margin: '0 auto',
      marginBottom: 36,
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: 400,
    },
  },
});

class DollDetail extends React.Component {
  constructor(props) {
    super(props);

    /* this.state = {
      info: undefined,
      skeleton: undefined,

      skinNo: 0,
      skinType: 'normal',
      skillLv: 10,
    }; */
    this.state = {
      info: undefined,

      skinNo: 0,
      skinType: 'normal',
      skillLv: 10,
      skill2Lv: 10,
    };

    this.handleSkinChange = this.handleSkinChange.bind(this);
    this.toggleSkinType = this.toggleSkinType.bind(this);
    this.handleSkillLvChange = this.handleSkillLvChange.bind(this);
    this.handleSkill2LvChange = this.handleSkill2LvChange.bind(this);
    this.wrap = this.wrap.bind(this);
  }

  componentWillMount() {
    const id = Number(this.props.match.params.id);

    DollRepository.fetchById(id)
      .then(info => this.setState({ info }));

    // SpineRepository.fetchDefaultSpine(id)
    //   .then(skeleton => this.setState({ skeleton }));
  }

  handleSkinChange(no) {
    // SpineRepository.fetchSpine(this.state.info.id, no)
    //   .then(skeleton => this.setState({ skeleton }));

    this.setState({ skinNo: no });
  }

  toggleSkinType() {
    this.setState({
      skinType: this.state.skinType === 'normal' ? 'damaged' : 'normal',
    });
  }

  handleSkillLvChange(no) {
    this.setState({
      skillLv: no,
    });
  }
  handleSkill2LvChange(no) {
    this.setState({
      skill2Lv: no,
    });
  }

  wrap(content) {
    return (
      <Grid className={this.props.classes.boxWrapper} item xs={12}>
        {content}
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;
    // const { skeleton } = this.state;
    const {
      info,
      skinNo,
      skinType,
      skillLv,
      skill2Lv,
    } = this.state;

    if (!info) {
      return null;
    }

    let color = '#505694';

    switch (info.rank.starCnt) {
      case 2: color = '#787878'; break;
      case 3: color = '#2e5770'; break;
      case 4: color = '#7e8644'; break;
      case 5: color = (info.rank.name === 'Extra') ? '#505694' : '#a97744'; break;
      default: color = '#505694';
    }

    // between Status and Skill
    // {this.wrap(<SDBox width={250} height={250} skeleton={skeleton} />)}
    return (
      <div className={classes.wrapper}>
        <Background color={color} />
        <div className={classes.header}>
          <Grid container>
            <Caption name={info.krName} />
            <NumberBox id={info.id} />
            <Grid container className={classes.titleLine}>
              <HorizonLine height={3} />
            </Grid>
            <SkinTabbar selected={skinNo} skins={info.images} onChange={this.handleSkinChange} />
            <StarBox count={info.rank.starCnt} />
          </Grid>
        </div>
        <div className={classes.img}>
          <TypeSwitchBox on={skinType === 'damaged'} toggle={this.toggleSkinType} />
          <Illust src={info.images[skinNo][skinType]} />
        </div>
        <div className={classes.info}>
          {this.wrap(<BasicInfoBox
            armType={info.type.krName}
            illust={info.illust}
            voice={info.voice}
          />)}
          {this.wrap(<StatusInfoBox {...info.stats} />)}
          {this.wrap(<SkillBox
            hasNight={!(info.skill.nightDataPool === undefined)}
            skill={info.getSkill({ level: skillLv, night: false })}
            nightSkill={
              info.skill.nightDataPool
                ? info.getSkill({ level: skillLv, night: true })
                : undefined
            }
            lv={skillLv}
            onChange={this.handleSkillLvChange}
          />)}
          {info.skill2 ?
            this.wrap(<SkillBox
              hasNight={!(info.skill2.nightDataPool === undefined)}
              skill={info.getSkill2({ level: skill2Lv, night: false })}
              nightSkill={
                info.skill2.nightDataPool
                  ? info.getSkill2({ level: skillLv, night: true })
                  : undefined
              }
              lv={skill2Lv}
              onChange={this.handleSkill2LvChange}
            />) :
            <div />
          }
          {this.wrap(<EffectBox {...info.effect} hasLevel={info.type.code === 'hg'} />)}
          {this.wrap(<AcquisitionInfoBox {...info.acquisition} />)}
        </div>
      </div>
    );
  }
}

export default withStyles(style)(DollDetail);
