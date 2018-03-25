import React from 'react';
import { Card } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import style from './style';

import EquipUtil from '../../../repositories/data/equip';

import spriteBg2 from './bg_2.png';
import spriteBg3 from './bg_3.png';
import spriteBg4 from './bg_4.png';
import spriteBg5 from './bg_5.png';


class EquipCard extends React.Component {
  render() {
    const {
      classes,
      name,
      rank,
    } = this.props;

    let spriteBg;
    switch (rank) {
      case 2: spriteBg = spriteBg2; break;
      case 3: spriteBg = spriteBg3; break;
      case 4: spriteBg = spriteBg4; break;
      case 5: spriteBg = spriteBg5; break;
      default: spriteBg = spriteBg5; break;
    }
    
    return (
      <Card className={classes.root}>
        <div className={classes.cardbackground} />
        <div className={classes.rankbar}>
          {Array(rank).fill().map((_, i) => <span key={i} className={classes.star}>★</span>)}
        </div>
        <img className={classes.spriteBg} alt="background" src={spriteBg} />
        <img className={classes.sprite} alt={name} src={EquipUtil.getSpriteUrl(this.props)} />
        <div className={classes.caption} style={{ color: EquipUtil.getRankColor(rank) }}>{name}</div>
      </Card>
    );
  }
}

export default withStyles(style)(EquipCard);
