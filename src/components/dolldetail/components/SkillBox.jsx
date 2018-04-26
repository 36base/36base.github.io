import React from 'react';
import { Grid, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import InfoBox from '../../common/InfoBox';
import Square from '../../common/Square';
import ImageBox from '../../common/ImageBox';
import SmallSelector from '../../common/SmallSelector';

const domain = 'https://girlsfrontline.kr/hotlink-ok/girlsfrontline-resources/images';

const style = theme => ({
  container: {
    padding: `${theme.spacing.unit}px 0`,
  },
  iconWrapper: {
    maxWidth: theme.spacing.unit * 8,
    margin: '0 auto',
  },
  icon: {
    border: '1px solid red',
  },
  alignMiddle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  alignBottom: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  yellow: {
    color: '#FDA50C',
  },
});

const lvValues = Array(10).fill().map((_, i) => ({ value: i + 1, name: i + 1 }));

function getUrl(path) {
  return `${domain}/skill/${path}.png`;
}

class SkillBox extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.renderProperty = this.renderProperty.bind(this);
    this.renderNightProperty = this.renderNightProperty.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
  }

  onChange(event) {
    const { value } = event.target;
    this.props.onChange(value);
  }

  renderProperty(key, postfix) {
    const data = this.props.skill.data.find(e => e.key === key);
    if (!data) {
      return null;
    }

    const { label } = data;
    const value = this.props.hasNight
      ? this.props.nightSkill.dataPool[key]
      : this.props.skill.dataPool[key];

    return (
      <Typography align="right" variant="body1">
        {label} <span className={this.props.classes.yellow}>{value + postfix}</span>
      </Typography>
    );
  }

  renderNightProperty(key, postfix) {
    if (!this.props.hasNight) {
      return null;
    }

    const { label } = this.props.nightSkill.data.find(e => e.key === key);
    const value = this.props.nightSkill.dataPool[key];

    return (
      <Typography align="right" variant="body1">
        {`${label}(야간)`} <span className={this.props.classes.yellow}>{value + postfix}</span>
      </Typography>
    );
  }

  renderDescription() {
    const { classes } = this.props;
    if (this.props.hasNight) {
      return [
        <Grid className={classes.alignMiddle} align="center" key="day" item xs={6}>
          <Typography>주간</Typography>
        </Grid>,
        <Grid className={classes.alignMiddle} align="center" key="night" item xs={6}>
          <Typography>야간</Typography>
        </Grid>,
        <Grid key="desc_day" item xs={6}>
          <Typography>{this.props.skill.desc}</Typography>
        </Grid>,
        <Grid key="desc_night" item xs={6}>
          <Typography>{this.props.nightSkill.desc}</Typography>
        </Grid>,
      ];
    }

    return (
      <Grid item xs={12}><Typography>{this.props.skill.desc}</Typography></Grid>
    );
  }

  render() {
    const { classes, lv } = this.props;

    const selector = <SmallSelector label="레벨" values={lvValues} selected={lv} onChange={this.onChange} />;
    const initCooldown = this.renderProperty('IC', '초');
    const cooldown = this.renderProperty('CD', '초');
    const duration = this.renderProperty('DR', '초');
    const nightDuration = this.renderNightProperty('DR', '초');
    const description = this.renderDescription();

    return (
      <InfoBox name="스킬" selector={selector}>
        <Grid className={classes.container} container>
          <Grid item xs={4}>
            <div className={classes.iconWrapper}>
              <Square><ImageBox src={getUrl(this.props.skill.path)} /></Square>
            </div>
          </Grid>
          <Grid className={classes.alignMiddle} item xs={4}>
            <Typography variant="display3">{this.props.skill.name}</Typography>
          </Grid>
          <Grid className={classes.alignBottom} item xs={4}>
            {initCooldown}
            {cooldown}
            {duration}
            {nightDuration}
          </Grid>
          {description}
        </Grid>
      </InfoBox>
    );
  }
}

export default withStyles(style)(SkillBox);
