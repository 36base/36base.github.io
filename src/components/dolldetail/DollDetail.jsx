import React from 'react';
import { Grid } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { FormattedMessage } from 'react-intl';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

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
import SDBox from './components/SDBox';
import SkillBox from './components/SkillBox';
import EffectBox from './components/EffectBox';
import AcquisitionInfoBox from './components/AcquisitionInfoBox';

import DollRepository from '../../repositories/DollRepository';
import SpineRepository from '../../repositories/SpineRepository';

const style = theme => ({
  wrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
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
      maxWidth: 500,
    },
  },
  button: {
    display: 'block',
    padding: '15px',
    fontSize: '17px',
    textDecoration: 'none',
    color: 'black',
    textAlign: 'center',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: '1px',
  },
});

class DollDetail extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);

    const { cookies } = props;

    let langState = cookies.get('lang');

    if (langState === undefined) {
      langState = 'ko';
    }

    this.state = {
      info: undefined,
      skeleton: undefined,
      hasMod: false,
      skinNo: 0,
      skinType: 'normal',
      skillLv: 10,
      skill2Lv: 10,
      languageName: langState,
    };

    this.handleLanguageChange = this.handleLanguageChange.bind(this);
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

    if (id < 20000) {
      DollRepository.fetchById(id + 20000)
        .then((info) => {
          if (info) this.setState({ hasMod: true });
        });
    }
    SpineRepository.fetchDefaultSpine(id)
      .then(skeleton => this.setState({ skeleton }));
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleLanguageChange(langName) {
    if (langName === 'ko') {
      return (
        <Caption name={this.state.info.krName} />
      );
    }
    return (
      <Caption name={this.state.info.name} />
    );
  }

  handleSkinChange(no) {
    const { id } = this.state.info;
    SpineRepository.fetchSpine((id > 20000 && no !== 0) ? id - 20000 : id, no)
      .then(skeleton => this.setState({ skeleton }));

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
    const {
      info,
      skeleton,
      skinNo,
      skinType,
      skillLv,
      skill2Lv,
      languageName,
    } = this.state;

    if (!info) { return null; }

    let color = '#505694';

    switch (info.rank.starCnt) {
      case 2: color = '#787878'; break;
      case 3: color = '#2e5770'; break;
      case 4: color = '#7e8644'; break;
      case 5: color = (info.rank.name === 'Extra') ? '#505694' : '#a97744'; break;
      default: color = '#505694';
    }

    return (
      <div className={classes.wrapper}>
        <Background color={color} />
        <div className={classes.header}>
          <Grid container>
            { this.handleLanguageChange(languageName) }
            <NumberBox id={info.id < 20000 ? info.id : info.id - 20000} />
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
          {this.state.hasMod
            ? this.wrap(<a href={info.id + 20000} className={classes.button}><FormattedMessage id="MOD Ver Link" /></a>)
            : <div />}
          {info.id > 20000
            ? this.wrap(<a href={info.id - 20000} className={classes.button}><FormattedMessage id="NON-MOD Ver Link" /></a>)
            : <div />}
          {this.wrap(<SDBox width={250} height={250} skeleton={skeleton} />)}
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
                  ? info.getSkill2({ level: skill2Lv, night: true })
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

export default withStyles(style)(withCookies(DollDetail));
