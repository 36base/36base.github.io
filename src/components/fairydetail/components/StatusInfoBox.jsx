import React from 'react';
import { withStyles } from 'material-ui/styles';
import { injectIntl, FormattedMessage } from 'react-intl';

import SmallSelector from '../../common/SmallSelector';
import style from './style';

const levelValues = Array(100).fill().map((_, i) => ({ value: i + 1, name: i + 1 }));
const qualityLevelValues = Array(5).fill().map((_, i) => ({ value: i + 1, name: i + 1 }));

class StatusInfoBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      level: props.default.level,
      qualityLevel: props.default.qualityLevel,
    };
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleQualityLevelChange = this.handleQualityLevelChange.bind(this);
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
  handleLevelChange(event) {
    this.setState({ level: event.target.value }, () => {
      this.props.handler(this.state.level, this.state.qualityLevel);
    });
  }
  handleQualityLevelChange(event) {
    this.setState({ qualityLevel: event.target.value }, () => {
      this.props.handler(this.state.level, this.state.qualityLevel);
    });
  }
  render() {
    const {
      classes,
      intl,
      stats,
      grow,
    } = this.props;
    const { level, qualityLevel } = this.state;
    return (
      <div className={classes.infoBox}>
        <div className={classes.title}>
          <div className={classes.titleName}><FormattedMessage id="Status" /></div>
          <div className={classes.selectorLabel}><FormattedMessage id="Level" /></div>
          <SmallSelector
            className={classes.selector}
            values={levelValues}
            selected={level}
            onChange={this.handleLevelChange}
          />
          <div className={classes.selectorLabel}><FormattedMessage id="Rarity" /></div>
          <SmallSelector
            className={classes.selector}
            values={qualityLevelValues}
            selected={qualityLevel}
            onChange={this.handleQualityLevelChange}
          />
        </div>
        {this.buildRow(intl.formatMessage({ id: 'Damage' }), stats.pow, 55, '#00b8d4')}
        {this.buildRow(intl.formatMessage({ id: 'Evasion' }), stats.dodge, 88, '#00c853')}
        {this.buildRow(intl.formatMessage({ id: 'Armor' }), stats.armor, 25, '#d50000')}
        {this.buildRow(intl.formatMessage({ id: 'Crit. Damage' }), stats.critDmg, 40, '#ff6d00')}
        {this.buildRow(intl.formatMessage({ id: 'Accuracy' }), stats.hit, 90, '#ffd600')}
        {this.buildRow(intl.formatMessage({ id: 'grow' }), grow, 320, '#2962ff')}
      </div>
    );
  }
}

export default injectIntl(withStyles(style)(StatusInfoBox));
