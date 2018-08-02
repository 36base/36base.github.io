import React from 'react';
import { withStyles } from 'material-ui/styles';
import { fairy } from 'girlsfrontline-core';
import { injectIntl, FormattedMessage } from 'react-intl';

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
      stats: target[0].getStats({ level: 1, quality: 1 }),
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
    const { classes, intl } = this.props;
    return (
      <div className={classes.infoBox}>
        <div className={classes.title}>
          <div className={classes.titleName}><FormattedMessage id="Status" /></div>
          <div className={classes.selectorLabel}><FormattedMessage id="level" /></div>
          <SmallSelector
            className={classes.selector}
            values={lvValues}
            selected={this.state.lv}
            onChange={this.handleLvChange}
          />
          <div className={classes.selectorLabel}><FormattedMessage id="Rarity" /></div>
          <SmallSelector
            className={classes.selector}
            values={modValues}
            selected={this.state.mod}
            onChange={this.handleModChange}
          />
        </div>
        {this.buildRow(intl.formatMessage({ id: 'Damage' }), this.state.stats.pow, 55, '#00b8d4')}
        {this.buildRow(intl.formatMessage({ id: 'Evasion' }), this.state.stats.dodge, 88, '#00c853')}
        {this.buildRow(intl.formatMessage({ id: 'Armor' }), this.state.stats.armor, 25, '#d50000')}
        {this.buildRow(intl.formatMessage({ id: 'Crit. Damage' }), this.state.stats.critDmg, 40, '#ff6d00')}
        {this.buildRow(intl.formatMessage({ id: 'Accuracy' }), this.state.stats.hit, 90, '#ffd600')}
        {this.buildRow(intl.formatMessage({ id: 'grow' }), this.props.grow, 320, '#2962ff')}
      </div>
    );
  }
}

export default injectIntl(withStyles(style)(StatusInfoBox));
