import React from 'react';
import { withStyles } from 'material-ui/styles';

import SmallSelector from '../../common/SmallSelector';
import style from './style';

const lvValues = Array(10).fill().map((_, i) => ({ value: i + 1, name: i + 1 }));

class SkillBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = { lv: 1 };

    this.onChange = this.onChange.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
    this.getDesc = this.getDesc.bind(this);
  }

  onChange(event) {
    this.setState({ lv : event.target.value });
  }

  renderDescription(skill, lv) {
    const { classes } = this.props;

    return null;
  }

  getDesc(template, dataPool, lv) {
    let desc = template;

    Object.entries(dataPool).forEach(([key, value]) => {
      desc = desc.replace(new RegExp(`{${key}}`, 'g'), value[lv - 1]);
    });

    return desc;
  }


  render(){
    const { classes } = this.props;
    const description = this.getDesc(this.props.skill.desc, this.props.skill.dataPool, this.state.lv);

    let cd = this.props.skill.dataPool.CD;
    if (cd === undefined){
      cd = '없음';
    }

    const cp = this.props.skill.dataPool.CP;

    return(
      <div className={classes.infoBox}>
        <div className={classes.infoTitle}>
          <div>스킬</div>
          <SmallSelector className={ classes.infoSelector } values={ lvValues } selected={ this.state.lv } onChange={ this.onChange } />
        </div>
        <div className={classes.skillName}>{ this.props.skill.name }</div>
        <div> 쿨다운 <span className={classes.skillBoxYellow}>{ cd }</span></div>
        <div> 지령 소모치 <span className={classes.skillBoxYellow}>{ cp }</span></div>
        <div>{ description }</div>
      </div>
    );
  };

}

export default withStyles(style)(SkillBox);
