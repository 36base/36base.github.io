import React from 'react';
import { withStyles } from 'material-ui/styles';

import style from './style';


const StatusInfoBox = (props) => {
  const { classes } = props;

  const buildRow = (label, value) => {
    return (
      <div className={classes.infoRow}>
        <div className={classes.rowTitle}>{label}</div>
        <div className={classes.rowTitle}>{value}</div>
      </div>
    );
  };

  return (
    <div className={classes.infoBox}>
      <div className={classes.infoTitle}>스테이터스</div>
      {buildRow('화력', props.pow)}
      {buildRow('회피', props.dodge)}
      {buildRow('장갑', props.armor)}
      {buildRow('치명상', props.critDmg)}
      {buildRow('명중', props.hit)}
      {buildRow('성장', props.grow)}
    </div>
  );
};

export default withStyles(style)(StatusInfoBox);
