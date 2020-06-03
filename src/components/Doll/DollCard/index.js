import React from 'react';
import { compose } from 'redux';
import { Card, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

import Star from '../../common/Star';
import styles from './styles';

import { getDollResourceUrl, getDollTypeIconUrl } from '../../../utils/url';

class DollCard extends React.Component {
  render() {
    const {
      classes,
      id,
      codename,
      name,
      type,
      rank,
    } = this.props;

    return (
      <Card className={[classes.root, 'undraggable'].join(' ')} component={props => <Link to={`/doll/${id}`} {...props} />}>
        <div className={classes.rankbar}>
          <Star className={classes.star} count={rank.starCnt} />
        </div>
        <LazyLoad height={300} once>
          <div className={classes.portrait} style={{ backgroundImage: `url(${getDollResourceUrl(codename, 'portrait')})` }} />
        </LazyLoad>
        <Typography
          className={[classes.caption, classes[rank.name.toLowerCase()]].join(' ')}
          component="div"
        >
          {name}
        </Typography>
        <img className={classes.typeIcon} src={getDollTypeIconUrl(type, rank.id)} alt="" />
        <div className={classes.no}>{id % 1000}</div>
      </Card>
    );
  }
}

export default compose(
  withStyles(styles),
)(DollCard);
