import React from 'react';
import { withStyles } from 'material-ui/styles';

import SmallSelector from '../../common/SmallSelector';

const lvValues = Array(10).fill().map((_, i) => ({ value: i + 1, name: i + 1 }));

const style = ({
  container: {
    width: '70%',
    margin: '30px 0px',
  },
  title: {
    justifyContent: 'space-between',
    color: 'grey',
    fontSize: '1.25em',
    padding: '6px',
    borderBottom: '1px solid black',
    clear: 'both',
  },
  titleName: {
    float: 'left',
  },
  skillName: {
    fontSize: '1.5em',
    color: 'rgba(0, 0, 0, 0.54)',
    fontWeight: '400',
    textAlign: 'center',
    margin: '10px',
  },
  skillBoxYellow: {
    color: '#FDA50C',
  },
});

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
    const description = this.getDesc(
      this.props.skill.desc,
      this.props.skill.dataPool,
      this.state.lv,
    );

    let cd = this.props.skill.dataPool.CD;
    if (cd === undefined) {
      cd = '없음';
    }

    const cp = this.props.skill.dataPool.CP;

    return (
      <div className={classes.container}>
        <div className={classes.title}>
          <div className={classes.titleName}>스킬</div>
          <SmallSelector
            className={classes.selector}
            values={lvValues}
            selected={this.state.lv}
            onChange={this.handleSkillLvChange}
          />
        </div>
        <div className={classes.body}>
          <div className={classes.skillName}>{ this.props.skill.name }</div>
          <div> 쿨다운 <span className={classes.skillBoxYellow}>{ cd }</span></div>
          <div> 지령 소모치 <span className={classes.skillBoxYellow}>{ cp }</span></div>
          <div>{ description }</div>
        </div>
      </div>
    );
  }
}

export default withStyles(style)(SkillBox);
