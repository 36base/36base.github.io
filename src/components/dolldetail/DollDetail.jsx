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
import SDBox from './components/SDBox';
import SkillBox from './components/SkillBox';
import EffectBox from './components/EffectBox';
import AcquisitionInfoBox from './components/AcquisitionInfoBox';

import DollRepository from '../../repositories/DollRepository';
import SpineRepository from '../../repositories/SpineRepository';

const style = theme => ({
  wrapper: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  header: {
    paddingTop: '2%',
    paddingRight: 25,
  },
  headerDivider: {
    width: '100%',
    height: 3,
    backgroundColor: theme.palette.primary.dark,
  },
  content: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    margin: 0,
    width: '100%',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
  },
  right: {
    overflow: 'auto',
  },
  boxWrapper: {
    minWidth: 200,
    maxWidth: 400,
    marginBottom: 36,
  },
});

class DollDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      info: undefined,
      skeleton: undefined,

      skinNo: 0,
      skinType: 'normal',
      skillLv: 10,
    };

    this.handleSkinChange = this.handleSkinChange.bind(this);
    this.toggleSkinType = this.toggleSkinType.bind(this);
    this.handleSkillLvChange = this.handleSkillLvChange.bind(this);
    this.wrap = this.wrap.bind(this);
  }

  componentWillMount() {
    const id = Number(this.props.match.params.id);

    DollRepository.fetchById(id)
      .then(info => this.setState({ info }));

    SpineRepository.fetchDefaultSpine(id)
      .then(skeleton => this.setState({ skeleton }));
  }

  handleSkinChange(no) {
    SpineRepository.fetchSpine(this.state.info.id, no)
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
    } = this.state;

    if (!info) {
      return null;
    }

    return (
      <div className={classes.wrapper}>
        <Background mainColor="#505694" secondColor="#8C94BF" />
        <div className={classes.header}>
          <Grid container>
            <Caption name={info.krName} />
            <NumberBox id={info.id} />
            <HorizonLine height={3} />
            <SkinTabbar selected={skinNo} skins={info.images} onChange={this.handleSkinChange} />
            <StarBox count={info.rank.starCnt} />
          </Grid>
        </div>
        <Grid className={classes.content} container >
          <Grid className={classes.left} item xs={6}>
            <TypeSwitchBox on={skinType === 'damaged'} toggle={this.toggleSkinType} />
            <Illust src={info.images[skinNo][skinType]} />
          </Grid>
          <Grid className={classes.right} item xs={6}>
            {this.wrap(<BasicInfoBox
              armType={info.type.enName}
              illust={info.illust}
              voice={info.voice}
            />)}
            {this.wrap(<StatusInfoBox {...info.stats} />)}
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
            {this.wrap(<EffectBox {...info.effect} hasLevel={info.type.code === 'hg'} />)}
            {this.wrap(<AcquisitionInfoBox {...info.acquisition} />)}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(style)(DollDetail);
