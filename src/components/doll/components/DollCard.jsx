import React from 'react';
import { Card, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

import Star from '../../common/Star';
import style from './style';

class DollCard extends React.Component {
  render() {
    const { classes, info } = this.props;
    const {
      name,
      rank,
      icon,
      portrait,
    } = info;

    let { id } = info;
    const realId = id;

    if (id > 1000) id %= 1000;

    return (
      <Card className={[classes.root, 'undraggable'].join(' ')} component={props => <Link to={`/doll/${realId}`} {...props} />}>
        <div className={classes.rankbar}>
          <Star className={classes.star} count={rank.starCnt} />
        </div>
        <LazyLoad>
          <div className={classes.portrait} style={{ backgroundImage: `url(${portrait})` }} />
        </LazyLoad>
        <Typography
          className={[classes.caption, classes[rank.name.toLowerCase()]].join(' ')}
          component="div"
        >
          {name}
        </Typography>
        <img className={classes.typeIcon} src={icon} alt="" />
        <div className={classes.no}>{id}</div>
      </Card>
    );
  }
}

export default withStyles(style)(DollCard);
