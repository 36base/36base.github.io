import React from 'react';
import { Card, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

import Star from '../../common/Star';
import style from './style';

class DollCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  }

  handleLanguageChange(langName) {
    if (langName === 'ko') {
      return (this.props.krName);
    }
    return (this.props.name);
  }

  render() {
    const {
      classes,
      rank,
      icon,
      portrait,
      lang,
    } = this.props;

    let { id } = this.props;
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
          {this.handleLanguageChange(lang)}
        </Typography>
        <img className={classes.typeIcon} src={icon} alt="" />
        <div className={classes.no}>{id}</div>
      </Card>
    );
  }
}

export default withStyles(style)(DollCard);
