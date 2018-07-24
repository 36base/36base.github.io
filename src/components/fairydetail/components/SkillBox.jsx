import React from 'react';
import { withStyles } from 'material-ui/styles';

import SmallSelector from '../../common/SmallSelector';
import style from './style';

const lvValues = Array(10).fill().map((_, i) => ({ value: i + 1, name: i + 1 }));

class SkillBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = { lv: 1 };

    this.getDesc = this.getDesc.bind(this);
    this.handleSkillLvChange = this.handleSkillLvChange.bind(this);
  }

  getDesc(template, dataPool, lv) {
    let desc = template;

    Object.entries(dataPool).forEach(([key, value]) => {
      desc = desc.replace(new RegExp(`{${key}}`, 'g'), value[lv - 1]);
    });

    return desc;
  }
  handleSkillLvChange(event) {
    this.setState({ lv: event.target.value });
  }


  render() {
    const { classes } = this.props;
    let description = this.getDesc(
      this.props.skill.desc,
      this.props.skill.dataPool,
      this.state.lv,
    );
    if (this.props.skill.id === 1011) {
      if (this.props.skill.dataPool.MV[9] === 0) {
        const temp = this.props.skill.dataPool;
        temp.MV[9] = '무한대';
        description = this.getDesc(
          this.props.skill.desc,
          temp,
          this.state.lv,
        );
      }
    }
    let cd = this.props.skill.dataPool.CD;
    if (cd === undefined) {
      cd = '없음';
    }

    const cp = this.props.skill.dataPool.CP;

    return (
      <div className={classes.infoBox}>
        <div className={classes.title}>
          <div className={classes.titleName}>스킬</div>
          <div className={classes.selectorLabel}>레벨</div>
          <SmallSelector
            className={classes.selector}
            values={lvValues}
            selected={this.state.lv}
            onChange={this.handleSkillLvChange}
          />
        </div>
        <div className={classes.body}>
          <div className={classes.skillInfo}>
            <img src={this.props.icon} alt="skill icon" className={classes.skillIcon} />
            <div className={classes.skillName}>{ this.props.skill.name }</div>
            <div>
              <div> 쿨다운 <span className={classes.skillBoxYellow}>{ cd }</span></div>
              <div> 지령 소모치 <span className={classes.skillBoxYellow}>{ cp }</span></div>
            </div>
          </div>
          <div>{ description }</div>
        </div>
      </div>
    );
  }
}

export default withStyles(style)(SkillBox);
