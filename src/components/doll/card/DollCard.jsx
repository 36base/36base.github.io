import React from 'react';
import { Card, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';

import style from './style';

class DollCard extends React.Component {
  render() {
    const {
      classes,
      id,
      krName,
      rank,
      icon,
      portrait,
    } = this.props;

    return (
      <Card className={[classes.root, 'undraggable'].join(' ')} component={props => <Link to={`/doll/${id}`} {...props} />}>
        <div className={classes.background} />
        <div className={classes.rankbar}>
          {
            Array(rank.starCnt).fill()
              .map((_, i) => <span key={i} className={classes.star}>★</span>)
          }
        </div>
        <div className={classes.portrait} style={{ backgroundImage: `url(${portrait})` }} />
        <Typography
          className={[classes.caption, classes[rank.name.toLowerCase()]].join(' ')}
          component="div"
        >
          {krName}
        </Typography>
        <img className={classes.typeIcon} src={icon} alt="" />
        <div className={classes.no}>{id}</div>
      </Card>
    );
  }
}

export default withStyles(style)(DollCard);
