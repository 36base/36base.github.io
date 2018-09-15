import React from 'react';
import { Card } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';

import style from './style';


class FairyCard extends React.Component {
  render() {
    const {
      classes,
      info,
    } = this.props;

    return (
      <Card className={classes.root} component={props => <Link to={`/fairy/${info.id}`} {...props} />}>
        <div className={classes.background} />
        <div className={[classes.icon, classes[info.category]].join(' ')} />
        <div className={classes.image} style={{ backgroundImage: `url(${info.images.mod1.toLowerCase()})` }} />
        <div className={classes.info}>
          <div className={classes.name}>{info.name}</div>
          <div className={classes.skillIdWrapper}>
            <div className={classes.skillName}>{info.skill.name}</div>
            <div className={classes.id}>NO. {info.id}</div>
          </div>
        </div>
      </Card>
    );
  }
}

export default withStyles(style)(FairyCard);

