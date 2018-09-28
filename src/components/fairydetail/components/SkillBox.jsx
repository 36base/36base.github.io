import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl, FormattedMessage } from 'react-intl';

import SmallSelector from '../../common/SmallSelector';
import style from './style';

const levelValues = Array(10).fill().map((_, i) => ({ value: i + 1, name: i + 1 }));

class SkillBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = { level: props.default.level };

    this.getDesc = this.getDesc.bind(this);
    this.handleSkillLevelChange = this.handleSkillLevelChange.bind(this);
  }

  getDesc(template, dataPool, level) {
    let desc = template;

    Object.entries(dataPool).forEach(([key, value]) => {
      desc = desc.replace(new RegExp(`{${key}}`, 'g'), value[level - 1]);
    });

    return desc;
  }
  handleSkillLevelChange(event) {
    this.setState({ level: event.target.value }, () => {
      this.props.handler(this.state.level);
    });
  }


  render() {
    const { classes, skill } = this.props;

    return (
      <div className={classes.infoBox}>
        <div className={classes.title}>
          <div className={classes.titleName}><FormattedMessage id="Skill" /></div>
          <div className={classes.selectorLabel}><FormattedMessage id="Level" /></div>
          <SmallSelector
            className={classes.selector}
            values={levelValues}
            selected={this.state.level}
            onChange={this.handleSkillLevelChange}
          />
        </div>
        <div className={classes.body}>
          <div className={classes.skillInfo}>
            <img src={this.props.icon} alt="skill icon" className={classes.skillIcon} />
            <div className={classes.skillName}>{skill.name}</div>
            <div>
              <div><FormattedMessage id="cool down" /><span className={classes.skillBoxYellow}>{skill.coolDown}</span></div>
              <div><FormattedMessage id="Support Order Consume" /><span className={classes.skillBoxYellow}>{skill.consumption}</span></div>
            </div>
          </div>
          <div>{skill.description}</div>
        </div>
      </div>
    );
  }
}

export default injectIntl(withStyles(style)(SkillBox));
