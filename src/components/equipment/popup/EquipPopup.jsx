import React from 'react';

import { withStyles } from 'material-ui/styles';
import Select from 'material-ui/Select';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';


import style from './style';

import EquipUtil from '../../../repositories/data/equip';


class EquipPopup extends React.Component {
  constructor(props) {
    super(props);

    const defaultStat = { };
    Object.keys(props.stats).forEach((key) => { defaultStat[key] = props.stats[key].max; });

    this.state = {
      level: 10,
      stats: defaultStat,
    };
    this.handleLvChange = this.handleLvChange.bind(this);
    this.handleStatChange = this.handleStatChange.bind(this);
  }

  handleLvChange(event) {
    let newLevel = (event.target.value !== '') ? Number(event.target.value) : 1;

    newLevel = (newLevel > 10) ? 10 : newLevel;
    newLevel = (newLevel < 1) ? 1 : newLevel;

    this.setState({ level: newLevel });
  }

  handleStatChange(event) {
    const name = String(event.target.name);
    let value = (event.target.value !== '') ? Number(event.target.value) : 0;
    value = (this.props.stats[name].min > value) ? this.props.stats[name].min : value;
    value = (this.props.stats[name].max < value) ? this.props.stats[name].max : value;

    const newStateStats = this.state.stats;
    newStateStats[name] = value;

    this.setState({ stats: newStateStats });
  }

  render() {
    const data = this.props;
    const { classes } = this.props;

    console.log(this.state);

    return (
      <div>
        {(data) ? (
          <div className={classes.popup}>
            <img style={{ width: '100%' }} alt={data.name} src={EquipUtil.getSpriteUrl(data)} />
            <h2 style={{ textAlign: 'center', color: EquipUtil.getRankColor(data.rank) }}>{data.name}</h2>
            <h3 style={{ textAlign: 'center', color: 'white' }}>{data.krCategory}</h3>
            <h3 style={{ textAlign: 'center', color: 'white' }}>{data.krType}</h3>
            <FormControl className={classes.levelForm}>
              <InputLabel htmlFor="level" style={{ color: 'gray' }}>레벨</InputLabel>
              <Select
                native
                className={classes.levelSelect}
                value={this.state.level}
                onChange={this.handleLvChange}
                inputProps={{
                  id: 'level',
                  name: 'level',
                }}
              >
                {Array(10).fill().map((_, i) => (
                  <option className={classes.statOption} value={i + 1}>{i + 1}</option>
                ))}
              </Select>
            </FormControl>
            <table className={classes.statTable}>
              <colgroup>
                <col style={{ width: '150px' }} />
                <col style={{ width: '150px' }} />
                <col style={{ width: '70px' }} />
              </colgroup>
              <tbody>
                {Object.keys(data.stats).map(key => (
                  <tr>
                    <td className={classes.statName}>{EquipUtil.StatDict[key]}</td>
                    <td className={classes.statNum}>
                      {
                        Math.round(this.state.stats[key] +
                          (this.state.stats[key] *
                            (data.stats[key].upgrade *
                              (Number(this.state.level) / 100)
                            )
                          ))
                      }
                    </td>
                    <td>
                      <FormControl className={classes.statCustom}>
                        <InputLabel htmlFor={`statSelect-${key}`} style={{ color: 'gray' }}>
                          {`교정수치 (${data.stats[key].min} ~ ${data.stats[key].max})`}
                        </InputLabel>
                        <Select
                          native
                          value={this.state.stats[key]}
                          onChange={this.handleStatChange}
                          inputProps={{
                            id: `statSelect-${key}`,
                            name: key,
                          }}
                          style={{ color: 'white' }}
                        >
                          {
                            Array((data.stats[key].max - data.stats[key].min) + 1).fill()
                              .map((_, i) => (
                                <option
                                  className={classes.statOption}
                                  value={data.stats[key].min + i}
                                >
                                  {data.stats[key].min + i}
                                </option>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 className={classes.craftTime}>{`제조시간 - ${EquipUtil.intTime2Str(data.buildTime)}`}</h3>
          </div>
        ) : <div />}
      </div>
    );
  }
}

export default withStyles(style)(EquipPopup);
