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
import IntroduceBox from './components/IntroduceBox';
import ScriptBox from './components/ScriptBox';

import DollRepository from '../../repositories/DollRepository';
import SpineRepository from '../../repositories/SpineRepository';

import getDollSpine from './../../repositories/data/getDollSpine';

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

    this.state = {
      info: undefined,
      images: undefined,
      skeleton: undefined,
      hasMod: false,
      skinCode: 0,
      skinNo: 0,
      skinType: 'normal',
    };

    this.handleSkinChange = this.handleSkinChange.bind(this);
    this.toggleSkinType = this.toggleSkinType.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleSkillLvChange = this.handleSkillLvChange.bind(this);
    this.handleSkill2LvChange = this.handleSkill2LvChange.bind(this);
    this.wrap = this.wrap.bind(this);
  }

  componentWillMount() {
    const id = Number(this.props.match.params.id);

    DollRepository.fetchById(id)
      .then(info => this.setState({ info }, () => {
        const getImage = (dollId, skinNo, isDamaged) => {
          const fname = `${dollId}${Number.isInteger(skinNo) ? `_${skinNo + 1}` : ''}`;
          return `https://girlsfrontline.kr/hotlink-ok/girlsfrontline-resources/images/guns/${fname}${isDamaged ? '_D' : ''}.png`;
        };

        const spine = getDollSpine(info.id);
        const spineNames = spine ? Object.keys(spine.names) : Array(info.skins.length + 1);
        const base = {
          id: 0,
          name: 'Default',
          spineCode: spineNames[0],
          normal: getImage(info.id, undefined, false),
          damaged: getImage(info.id, undefined, true),
        };

        const generalId = info.id < 20000 ? info.id : info.id - 20000;
        const images = [
          base,
          ...((info.id < 20000) ? (info.skins.map((e, i) => ({
            id: e.id + 1,
            name: e.name,
            spineCode: spineNames[i + 1],
            normal: getImage(generalId, i, false),
            damaged: getImage(generalId, i, true),
          }))) : []),
        ];
        this.setState({ images });
      }));

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

  handleSkinChange(no) {
    const { id } = this.state.info;
    SpineRepository.fetchSpine((id > 20000 && no !== 0) ? id - 20000 : id, no)
      .then(skeleton => this.setState({ skeleton }));

    this.setState({
      skinNo: no,
      skinCode: this.state.images[no].id,
    });
  }

  toggleSkinType() {
    this.setState({
      skinType: this.state.skinType === 'normal' ? 'damaged' : 'normal',
    });
  }

  handleStatusChange(level, favor) {
    this.setState({ info: Object.assign(this.state.info, { level, favor }) });
  }

  handleSkillLvChange(level) {
    this.setState({ info: Object.assign(this.state.info, { skillLevel: level }) });
  }
  handleSkill2LvChange(level) {
    this.setState({ info: Object.assign(this.state.info, { skillLevel2: level }) });
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
      images,
      skeleton,
      skinNo,
      skinCode,
      skinType,
    } = this.state;

    if (info === undefined || images === undefined) return (<div />);

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
            <Caption name={info.name} />
            <NumberBox id={info.id < 20000 ? info.id : info.id - 20000} />
            <Grid container className={classes.titleLine}>
              <HorizonLine height={3} />
            </Grid>
            <Grid container>
              <Grid item xs={8} md={10}>
                <SkinTabbar
                  selected={skinNo}
                  skins={images}
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
          {this.wrap(<BasicInfoBox
            armType={info.type.name}
            illust={info.illust}
            voice={info.voice}
          />)}
          {this.wrap(<StatusInfoBox
            id={info.id}
            stats={info.stats}
            handler={this.handleStatusChange}
          />)}
          {this.state.hasMod
            ? this.wrap(<a href={info.id + 20000} className={classes.button}><FormattedMessage id="MOD Ver Link" /></a>)
            : <div />}
          {info.id > 20000
            ? this.wrap(<a href={info.id - 20000} className={classes.button}><FormattedMessage id="NON-MOD Ver Link" /></a>)
            : <div />}
          {this.wrap(<SDBox width={250} height={250} skeleton={skeleton} />)}
          {this.wrap(<SkillBox
            skill={info.skill1}
            skillLevel={info.skillLevel}
            onChange={this.handleSkillLvChange}
          />)}
          {info.skill2 ?
            this.wrap(<SkillBox
              skill={info.skill2}
              skillLevel={info.skillLevel2}
              onChange={this.handleSkill2LvChange}
            />) :
            <div />
          }
          {this.wrap(<EffectBox {...info.effect} hasLevel={info.type.code === 'hg'} />)}
          {this.wrap(<AcquisitionInfoBox info={info} />)}
          {this.wrap(<IntroduceBox {...{ id: info.id, skinCode }} />)}
          {this.wrap(<ScriptBox {...{ id: info.id, skinCode }} />)}
        </div>
      </div>
    );
  }
}

export default withStyles(style)(withCookies(DollDetail));
