import React from 'react';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import InfoBox from '../../common/InfoBox';
import Square from '../../common/Square';
import ImageBox from '../../common/ImageBox';
import SmallSelector from '../../common/SmallSelector';

import { getSkillIconUrl } from '../../../utils/url';

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
  handleChange = (event) => {
    const { value } = event.target;
    const { onChange } = this.props;

    onChange(value);
  }

  renderProperty = (content) => {
    const { classes } = this.props;
    const splits = content.split(':');
    const label = splits[0].trim();
    const value = splits[1].trim();

    return (
      <Typography align="right" variant="body1">
        {`${label} `}
        <span className={classes.yellow}>
          {value}
        </span>
      </Typography>
    );
  }

  render() {
    const {
      classes,
      skill,
      skillLevel,
      t,
    } = this.props;

    const {
      codename,
      name,
      detail,
      desc,
    } = skill;

    const selector = <SmallSelector label={t('Level')} values={lvValues} selected={skillLevel} onChange={this.onChange} />;

    return (
      <InfoBox name={t('Skill')} selector={selector}>
        <Grid className={classes.container} container>
          <Grid item xs={4}>
            <div className={classes.iconWrapper}>
              <Square><ImageBox src={getSkillIconUrl(codename)} /></Square>
            </div>
          </Grid>
          <Grid className={classes.alignMiddle} item xs={4}>
            <Typography variant="display2">{t(name)}</Typography>
          </Grid>
          <Grid className={classes.alignBottom} item xs={4}>
            {String(t(detail)).split(',').map(item => this.renderProperty(item))}
          </Grid>
          <Grid item xs={12}><Typography>{t(desc)}</Typography></Grid>
        </Grid>
      </InfoBox>
    );
  }
}

export default compose(
  translate(),
  withStyles(style),
)(SkillBox);
