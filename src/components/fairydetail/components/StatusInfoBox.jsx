import React from 'react';
import { withStyles } from 'material-ui/styles';

import style from './style';


const StatusInfoBox = (props) => {
  const { classes } = props;

  const buildRow = (label, value, maxValue, color) => {
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
        <div className={classes.rowTitle}>{value}</div>
        <div className={classes.graph} style={statusBackground} />
      </div>,
    ];
  };

  return (
    <div className={classes.infoBox}>
      <div className={classes.infoTitle}>스테이터스</div>
      {buildRow('화력', props.pow, 372, 'brown')}
      {buildRow('회피', props.dodge, 242, 'green')}
      {buildRow('장갑', props.armor, 242, 'red')}
      {buildRow('치명상', props.critDmg, 201, 'orange')}
      {buildRow('명중', props.hit, 200, 'yellow')}
      {buildRow('성장', props.grow, 320, 'blue')}
    </div>
  );
};

export default withStyles(style)(StatusInfoBox);
