import React from 'react';
import { Card, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';

import style from './style';


class FairyCard extends React.Component {
  render() {
    const {
      classes,
      category,
      id,
      krName,
      name,
      skill,
      images,
    } = this.props;


    return (
      <Card className={classes.root} component={props => <Link to={`/fairy/${id}`} {...props} />}>
        <div className={classes.background} />
        <div className={[classes.icon, classes[category]].join(' ')} />
        <div className={classes.image} style={{backgroundImage: `url(${images})`}} />
        <div className={classes.info}>
          <div className={classes.krName}>{krName}</div>
          <div className={classes.skillIdWrapper}>
            <div className={classes.skillName}>{skill.name}</div>
            <div className={classes.id}>NO. {id}</div>
          </div>
        </div>
      </Card>
    );

  }
}

export default withStyles(style)(FairyCard);

