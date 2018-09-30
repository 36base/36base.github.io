import React from 'react';
import { compose } from 'redux';
import { Card } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Star from '../../common/Star';
import style from './style';

import spriteBg2 from './resources/bg_2.png';
import spriteBg3 from './resources/bg_3.png';
import spriteBg4 from './resources/bg_4.png';
import spriteBg5 from './resources/bg_5.png';

import { getEquipIconUrl } from '../../../utils/url';


class EquipCard extends React.Component {
  render() {
    const {
      classes,
      rank,
      codename,
      name,
      color,
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
          <Star className={classes.star} count={rank} />
        </div>
        <img className={classes.spriteBg} alt="background" src={spriteBg} />
        <img className={classes.sprite} alt={name} src={getEquipIconUrl(codename)} />
        <div className={classes.caption} style={{ color }}>{name}</div>
      </Card>
    );
  }
}

export default compose(
  withStyles(style),
)(EquipCard);
