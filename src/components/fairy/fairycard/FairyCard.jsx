import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { getFairyResourceUrl } from '../../../utils/url';
import background from './resources/background.png';
import battle from './resources/battle.png';
import strategy from './resources/strategy.png';
import styles from './styles';
import SkillBase from '../../Skill/SkillBase';

const FairyCard = ({
  children, className, classes, codename, name,
  category, introduce, description, skins, skill, ...other
}) => {
  const image = getFairyResourceUrl(skins[skins.length - 1].codename);
  return (
    <Card className={classnames(classes.card, className)} {...other}>
      <CardActionArea style={{ width: '100%' }}>
        <CardMedia
          className={classes.media}
          image={background}
          title={codename}
        >
          <img className={classes.typeIcon} src={category === 'battle' ? battle : strategy} alt={category} />
          <div className={classes.fairyImg} style={{ backgroundImage: `url(${image})` }} />
        </CardMedia>
        <CardContent>
          <Typography variant="headline">
            {name}
          </Typography>
          <Typography className={classes.description} color="textSecondary">
            {introduce}
          </Typography>
          <SkillBase
            className={classes.skill}
            codename={skill.codename}
            name={skill.name}
            description={description}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
FairyCard.defaultProps = {
  className: '',
};
FairyCard.propTypes = {
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  codename: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  introduce: PropTypes.string.isRequired,
  skins: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(FairyCard);
