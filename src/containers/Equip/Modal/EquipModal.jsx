import React, { Component } from 'react';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { getEquipIconUrl } from '../../../utils/url';

import styles from './styles';

// const categoryFormatDict = {
//   doll: 'Doll Equip',
// };

const StatNameFormatDict = {
  pow: 'Damage',
  hit: 'Accuracy',
  rate: 'Rate of Fire',
  dodge: 'Evasion',
  speed: 'Move Speed',
  criticalHarmRate: 'Crit. Damage',
  criticalPercent: 'Crit. Rate',
  nightview: 'NightView',
  bullet: 'Bullet Amount',
  armorPiercing: 'Armor Pen.',
};

function buildTime2Str(time) {
  const hour = Number.parseInt(time / 3600, 10);
  const min = Number.parseInt((time - (hour * 3600)) / 60, 10);
  const sec = Number.parseInt(time % 60, 10);

  return `${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
}

class EquipModal extends Component {
  constructor(props) {
    super(props);

    const { equip } = props;

    this.state = {
      level: equip.maxLevel,
    };
  }

  handleLvChange = (event) => {
    const { equip } = this.props;

    let newLevel = (event.target.value !== '') ? Number(event.target.value) : 1;

    newLevel = (newLevel > equip.maxLevel) ? equip.maxLevel : newLevel;
    newLevel = (newLevel < 0) ? 0 : newLevel;

    equip.level = newLevel;
    this.setState({ level: newLevel });
  }

  render() {
    const {
      t,
      classes,
      equip,
    } = this.props;
    const {
      codename,
      name,
      color,
      category,
      type,
      stats,
      maxLevel,
      buildTime,
      introduction,
    } = equip;
    const { level } = this.state;

    return (
      <div>
        <FormControl className={classes.popup}>
          <img style={{ width: '100%' }} alt={name} src={getEquipIconUrl(codename)} />
          <h2 style={{ textAlign: 'center', color }}>{t(name)}</h2>
          <h3 style={{ textAlign: 'center', color: 'white' }}>{category}</h3>
          <h3 style={{ textAlign: 'center', color: 'white' }}>{type}</h3>
          <div style={{ textAlign: 'center', color: 'white' }}>{t(introduction)}</div>
          <br />
          <div className={classes.levelForm}>
            <InputLabel htmlFor="level" style={{ color: 'gray' }}>
              {t('Level')}
            </InputLabel>
            <Select
              native
              className={classes.levelSelect}
              value={level}
              onChange={this.handleLvChange}
              inputProps={{
                id: 'level',
                name: 'level',
              }}
            >
              {maxLevel === 0
                ? <option className={classes.statOption} value={0}>-</option>
                : Array(maxLevel).fill().map((_, i) => (
                  <option key={i} className={classes.statOption} value={i + 1}>{i + 1}</option>
                ))
                }
            </Select>
          </div>
          <table className={classes.statTable}>
            <tbody>
              {Object.keys(stats).map(key => (
                <tr key={key}>
                  <td className={classes.statName}>
                    {
                        StatNameFormatDict[key]
                          ? t(StatNameFormatDict[key])
                          : key
                      }
                  </td>
                  <td className={classes.statNum}>
                    {stats[key].min === stats[key].max
                      ? `${stats[key].min}`
                      : `${stats[key].min} ~ ${stats[key].max}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className={classes.craftTime}>
            {
                buildTime === 0
                  ? (
                    <span style={{ color: 'red' }}>
                      {t('Non-craftable')}
                    </span>
                  )
                  : `${t('Production Time')} - ${buildTime2Str(buildTime)}`
              }
          </h3>
        </FormControl>
      </div>
    );
  }
}

export default compose(
  translate(),
  withStyles(styles),
)(EquipModal);
