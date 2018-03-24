import React from 'react';
import { Grid, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import InfoBox from '../../common/InfoBox';
import Square from '../../common/Square';
import ImageBox from '../../common/ImageBox';
import SmallSelector from '../../common/SmallSelector';

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

class SkillBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataMap: new Map(props.data.map(e => [e.key, e])),
    };

    this.isSeparated = this.isSeparated.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getDescription = this.getDescription.bind(this);
    this.renderCommonProperty = this.renderCommonProperty.bind(this);
  }

  onChange(event) {
    const { value } = event.target;
    this.props.onChange(value);
  }

  getDescription(dataPool) {
    const { desc, lv } = this.props;

    return Object.keys(dataPool).reduce((_desc, key) => _desc.replace(`{${key}}`, dataPool[key][lv - 1]), desc);
  }

  isSeparated() {
    return (this.props.nightDataPool !== undefined);
  }

  renderCommonProperty(key, postfix) {
    const { classes } = this.props;
    const data = this.props.dataPool[key];

    if (data === undefined) {
      return null;
    }

    const label = this.state.dataMap.get(key).label || '';
    const value = Number.isInteger(data) ? data : data[this.props.lv - 1];

    return (
      <Typography align="right" variant="body1">
        {label} <span className={classes.yellow}>{value + postfix}</span>
      </Typography>
    );
  }

  renderNightProperty(key, postfix) {
    const { classes, nightDataPool } = this.props;
    if (!(nightDataPool && nightDataPool[key])) {
      return null;
    }
    const data = nightDataPool[key];

    const label = `${this.state.dataMap.get(key).label || ''}(야간)`;
    const value = Number.isInteger(data) ? data : data[this.props.lv - 1];

    return (
      <Typography align="right" variant="body1">
        {label} <span className={classes.yellow}>{value + postfix}</span>
      </Typography>
    );
  }

  renderDiscription() {
    const { classes } = this.props;
    if (this.isSeparated()) {
      return [
        <Grid className={classes.alignMiddle} align="center" key="day" item xs={6}>
          <Typography>주간</Typography>
        </Grid>,
        <Grid className={classes.alignMiddle} align="center" key="night" item xs={6}>
          <Typography>야간</Typography>
        </Grid>,
        <Grid key="desc_day" item xs={6}>
          <Typography>
            {this.getDescription(this.props.dataPool)}
          </Typography>
        </Grid>,
        <Grid key="desc_night" item xs={6}>
          <Typography>
            {this.getDescription(this.props.nightDataPool)}
          </Typography>
        </Grid>,
      ];
    }

    return (
      <Grid item xs={12}>
        <Typography>{this.getDescription(this.props.dataPool)}</Typography>
      </Grid>
    );
  }

  render() {
    const { classes, lv } = this.props;

    const description = this.renderDiscription();
    const selector = <SmallSelector label="레벨" values={lvValues} selected={lv} onChange={this.onChange} />;

    return (
      <InfoBox name="스킬" selector={selector}>
        <Grid className={classes.container} container>
          <Grid item xs={4}>
            <div className={classes.iconWrapper}>
              <Square><ImageBox src={this.props.path} /></Square>
            </div>
          </Grid>
          <Grid className={classes.alignMiddle} item xs={4}>
            <Typography variant="display3">{this.props.name}</Typography>
          </Grid>
          <Grid className={classes.alignBottom} item xs={4}>
            {this.renderCommonProperty('IC', '초')}
            {this.renderCommonProperty('CD', '초')}
            {this.renderCommonProperty('DR', '초')}
            {this.renderNightProperty('DR', '초')}
          </Grid>
          {description}
        </Grid>
      </InfoBox>
    );
  }
}

export default withStyles(style)(SkillBox);
