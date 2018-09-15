import React from 'react';
import { Grid, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { injectIntl } from 'react-intl';

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
  }

  onChange(event) {
    const { value } = event.target;
    this.props.onChange(value);
  }

  renderProperty(label, value) {
    return (
      <Typography align="right" variant="body1">
        {label} <span className={this.props.classes.yellow}>{value}</span>
      </Typography>
    );
  }
  render() {
    const {
      classes,
      intl,
      skill,
      skillLevel,
    } = this.props;

    const {
      codename,
      name,
      detail,
      desc,
    } = skill;

    const selector = <SmallSelector label={intl.formatMessage({ id: 'Level' })} values={lvValues} selected={skillLevel} onChange={this.onChange} />;

    return (
      <InfoBox name={intl.formatMessage({ id: 'Skill' })} selector={selector}>
        <Grid className={classes.container} container>
          <Grid item xs={4}>
            <div className={classes.iconWrapper}>
              <Square><ImageBox src={getUrl(codename)} /></Square>
            </div>
          </Grid>
          <Grid className={classes.alignMiddle} item xs={4}>
            <Typography variant="display3">{name}</Typography>
          </Grid>
          <Grid className={classes.alignBottom} item xs={4}>
            {Object.keys(detail).map(key => this.renderProperty(key, detail[key]))}
          </Grid>
          <Grid item xs={12}><Typography>{desc}</Typography></Grid>
        </Grid>
      </InfoBox>
    );
  }
}

export default injectIntl(withStyles(style)(SkillBox));
