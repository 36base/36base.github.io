import React from 'react';
import { withStyles } from 'material-ui/styles';
import { fairy } from 'girlsfrontline-core';

import SmallSelector from '../../common/SmallSelector';
import style from './style';

const lvValues = Array(100).fill().map((_, i) => ({ value: i + 1, name: i + 1 }));
const modValues = Array(5).fill().map((_, i) => ({ value: i + 1, name: i + 1 }));

class StatusInfoBox extends React.Component {
  constructor(props) {
    super(props);

    const target = Object.assign({}, fairy.filter(({ id }) => id === Number(this.props.id)));
    this.state = {
      lv: 1,
      mod: 1,
      stats: target[0].getStats(),
    };
    this.handleLvChange = this.handleLvChange.bind(this);
    this.handleModChange = this.handleModChange.bind(this);
    this.buildRow = this.buildRow.bind(this);
  }
  buildRow = (label, value, maxValue, color) => {
    const { classes } = this.props;
    const statusRate = Math.min(1, value / maxValue) * 100;
    const statusBackground = {
      background: `linear-gradient(to right, ${color} ${statusRate}%, transparent ${statusRate}%)`,
    };
    if (typeof value === 'undefined' || value === null) {
      return undefined;
    }
    return [
      <div key="row" className={classes.infoRow}>
        <div className={classes.rowTitle}>{label}</div>
        <div className={classes.rowTitle}>{Math.round(value)}</div>
        <div className={classes.graph} style={statusBackground} />
      </div>,
    ];
  };
  handleLvChange(event) {
    this.setState({ lv: event.target.value }, () => {
      const target = Object.assign({}, fairy.filter(({ id }) => id === Number(this.props.id)));
      this.setState({
        stats: target[0].getStats({ level: this.state.lv, quality: this.state.mod }),
      });
    });
  }
  handleModChange(event) {
    this.setState({ mod: event.target.value }, () => {
      const target = Object.assign({}, fairy.filter(({ id }) => id === Number(this.props.id)));
      this.setState({
        stats: target[0].getStats({ level: this.state.lv, quality: this.state.mod }),
      });
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.infoBox}>
        <div className={classes.title}>
          <div className={classes.titleName}>스테이터스</div>
          <div className={classes.selectorLabel}>레벨</div>
          <SmallSelector
            className={classes.selector}
            values={lvValues}
            selected={this.state.lv}
            onChange={this.handleLvChange}
          />
          <div className={classes.selectorLabel}>개발수치</div>
          <SmallSelector
            className={classes.selector}
            values={modValues}
            selected={this.state.mod}
            onChange={this.handleModChange}
          />
        </div>
        {this.buildRow('화력', this.state.stats.pow, 55, 'brown')}
        {this.buildRow('회피', this.state.stats.dodge, 88, 'green')}
        {this.buildRow('장갑', this.state.stats.armor, 25, 'red')}
        {this.buildRow('치명상', this.state.stats.critDmg, 40, 'orange')}
        {this.buildRow('명중', this.state.stats.hit, 90, 'yellow')}
        {this.buildRow('성장', this.props.grow, 320, 'blue')}
      </div>
    );
  }
}

export default withStyles(style)(StatusInfoBox);
