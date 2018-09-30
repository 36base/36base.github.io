import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Grid, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Star from '../../components/common/Star';
import ImageBox from '../../components/common/ImageBox';
import HorizonLine from '../../components/common/HorizonLine';

import { getDollTypeIconUrl, getEquipIconUrl } from '../../utils/url';

import styles from './styles';

function timeToStr(time) {
  if (time === undefined || time === 0) {
    return '불가';
  }

  const hour = Math.floor(time / 3600);
  const min = (time / 60) % 60;
  return `${hour < 10 ? '0' : ''}${hour} : ${min < 10 ? '0' : ''}${min}`;
}

class TimeTable extends React.Component {
  state = {
    selectedType: 'doll',
    map: undefined,
    keys: [],
    renderItem: undefined,
  };

  componentWillMount() {
    const { selectedType } = this.state;

    this.setData(selectedType);
  }

  setData = (type) => {
    const { dolls, equips, fairies } = this.props;
    if (type === 'doll') {
      const group = dolls.reduce((map, e) => {
        const { id } = e;
        if (e.buildTime > 0 && id < 20000) {
          if (e.buildTime in map) {
            map[e.buildTime].push(e);
          } else {
            const temp = map;
            temp[e.buildTime] = [e];
            return temp;
          }
        }

        return map;
      }, {});

      this.setState({
        keys: Object.keys(group).map(Number).sort((l, r) => l - r),
        map: new Map(Object.keys(group).map(key => [Number(key), group[key]])),
        renderItem: this.renderDollItem,
      });
    } else if (type === 'equip') {
      const group = equips.reduce((map, e) => {
        const { buildTime } = e;

        if (buildTime && Number.isInteger(buildTime) && buildTime > 0) {
          if (buildTime in map) {
            map[buildTime].push(e);
          } else {
            const temp = map;
            temp[buildTime] = [e];
            return temp;
          }
        }
        return map;
      }, {});

      this.setState({
        keys: Object.keys(group).map(Number).sort((l, r) => l - r),
        map: new Map(Object.keys(group).map(key => [Number(key), group[key]])),
        renderItem: this.renderEquipItem,
      });
    } else if (type === 'fairy') {
      const group = fairies.reduce((map, e) => {
        const { buildTime } = e;

        if (buildTime && Number.isInteger(buildTime) && buildTime > 0) {
          if (buildTime in map) {
            map[buildTime].push(e);
          } else {
            const temp = map;
            temp[buildTime] = [e];
            return temp;
          }
        }

        return map;
      }, {});

      this.setState({
        keys: Object.keys(group).map(Number).sort((l, r) => l - r),
        map: new Map(Object.keys(group).map(key => [Number(key), group[key]])),
        renderItem: this.renderFairyItem,
      });
    }
  }

  handleTypeChange = (e) => {
    this.setState({ selectedType: e.target.value }, () => {
      const { selectedType } = this.state;

      this.setData(selectedType);
    });
  }

  renderDollItem = (data) => {
    const { t, classes } = this.props;
    return (
      <Link className={classes.link} to={`/doll/${data.id}`}>
        <span className={classes.typeIconWrapper}>
          <ImageBox src={getDollTypeIconUrl(data.type, data.rank.starCnt)} />
        </span>
        <Star className={classes.star} count={data.rank.starCnt} />
        <div className={`${classes.name} ${classes[data.rank.name.toLowerCase()]}`}>
          {t(data.name)}
        </div>
      </Link>
    );
  }

  renderEquipItem = (data) => {
    const { t, classes } = this.props;
    return (
      <Link className={classes.link} to={`/equip/${data.id}`}>
        <span className={classes.equipImageWrapper}>
          <ImageBox src={getEquipIconUrl(data.codename)} />
        </span>
        <Star className={classes.star} count={data.rank} />
        <div className={`${classes.name}`}>{t(data.name)}</div>
      </Link>
    );
  }

  renderFairyItem = (data) => {
    const { t, classes } = this.props;
    return (
      <Link className={classes.link} to={`/fairy/${data.id}`}>
        <div className={classes.name}>{t(data.name)}</div>
      </Link>
    );
  }

  renderRow = (key) => {
    const { classes } = this.props;
    const { map, renderItem } = this.state;

    const values = map.get(key);
    if (!values) {
      return null;
    }

    return [
      <Grid className={classes.timeCell} item xs={3} align="center">
        <Typography variant="display1">{timeToStr(key)}</Typography>
      </Grid>,
      <Grid className={classes.noPadding} item xs={9}>
        {
          values.map(e => renderItem(e))
            .reduce((acc, e) => (acc ? [...acc, <HorizonLine />, e] : [e]), null)
        }
      </Grid>,
    ];
  }

  render() {
    const { classes, t } = this.props;
    const { keys, selectedType } = this.state;

    const rows = keys
      .map(this.renderRow)
      .reduce((acc, e) => (acc ? [...acc, <HorizonLine />, e] : [e]), null);

    return (
      <div>
        <div>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">
              {t('type')}
            </FormLabel>
            <RadioGroup
              className={classes.group}
              value={selectedType}
              onChange={this.handleTypeChange}
            >
              <FormControlLabel value="doll" control={<Radio />} label={t('doll')} />
              <FormControlLabel value="equip" control={<Radio />} label={t('equip')} />
              <FormControlLabel value="fairy" control={<Radio />} label={t('fairy')} />
            </RadioGroup>
          </FormControl>
        </div>
        <Grid className={classes.container} container spacing={8}>
          {rows}
        </Grid>
        <div style={{ height: '100px' }} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dolls: state.dollDict.dolls,
  equips: state.equipDict.equips,
  fairies: state.fairyDict.fairies,
});

export default compose(
  translate(),
  connect(mapStateToProps, {}),
  withStyles(styles),
)(TimeTable);
