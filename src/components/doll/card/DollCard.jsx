import React from 'react';
import { Card, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';

import style from './style';

class DollCard extends React.Component {
  render() {
    const {
      id,
      rank,
      rankName,
      typeIcon,
      portrait,
      krName,
      classes,
    } = this.props;

    return (
      <Card className={[classes.root, 'undraggable'].join(' ')} component={props => <Link to={`/doll/${id}`} {...props} />}>
        <div className={classes.background} />
        <div className={classes.rankbar}>
          {Array(rank).fill().map((_, i) => <span key={i} className={classes.star}>★</span>)}
        </div>
        <div className={classes.portrait} style={{ backgroundImage: `url(${portrait})` }} />
        <Typography className={[classes.caption, classes[rankName]].join(' ')} component="div">{krName}</Typography>
        <img className={classes.typeIcon} src={typeIcon} alt="" />
        <div className={classes.no}>{id}</div>
      </Card>
    );
  }
}

export default withStyles(style)(DollCard);
