import React from 'react';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

import SmallSelector from '../../common/SmallSelector';
import style from './style';

const levelValues = Array(10).fill().map((_, i) => ({ value: i + 1, name: i + 1 }));

class SkillBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = { level: props.default.level };
  }

  getDesc = (template, dataPool, level) => {
    let desc = template;

    Object.entries(dataPool).forEach(([key, value]) => {
      desc = desc.replace(new RegExp(`{${key}}`, 'g'), value[level - 1]);
    });

    return desc;
  }

  handleSkillLevelChange = (event) => {
    this.setState({ level: event.target.value }, () => {
      const { handler } = this.props;
      const { level } = this.state;
      handler(level);
    });
  }


  render() {
    const {
      classes, skill, t, icon,
    } = this.props;
    const { level } = this.state;

    return (
      <div className={classes.infoBox}>
        <div className={classes.title}>
          <div className={classes.titleName}>
            {t('Skill')}
          </div>
          <div className={classes.selectorLabel}>
            {t('Level')}
          </div>
          <SmallSelector
            className={classes.selector}
            values={levelValues}
            selected={level}
            onChange={this.handleSkillLevelChange}
          />
        </div>
        <div className={classes.body}>
          <div className={classes.skillInfo}>
            <img src={icon} alt="skill icon" className={classes.skillIcon} />
            <div className={classes.skillName}>{t(skill.name)}</div>
            <div>
              <div>
                {t('cool down')}
                <span className={classes.skillBoxYellow}>{skill.coolDown}</span>
              </div>
              <div>
                {t('Support Order Consume')}
                <span className={classes.skillBoxYellow}>{skill.consumption}</span>
              </div>
            </div>
          </div>
          <div>{t(skill.description)}</div>
        </div>
      </div>
    );
  }
}

export default compose(
  translate(),
  withStyles(style),
)(SkillBox);
