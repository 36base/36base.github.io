import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { getSkillIconUrl } from '../../utils/url';

const styles = () => ({
  root: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  skillImage: {
    height: 46,
    marginRight: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  typoContainer: {
    width: '100%',
  },
});

const SkillBase = ({
  className, classes, codename, name, description,
}) => {
  const image = getSkillIconUrl(codename);
  return (
    <Grid container className={className} alignItems="center" wrap="nowrap">
      <img className={classes.skillImage} src={image} alt={codename} />
      <div className={classes.typoContainer}>
        <Typography className={classes.typography} variant="subheading">
          {name}
        </Typography>
        <Typography className={classes.typography} variant="caption" color="textSecondary">
          {description}
        </Typography>
      </div>
    </Grid>
  );
};
SkillBase.defaultProps = {
  className: '',
};
SkillBase.propTypes = {
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  codename: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default withStyles(styles)(SkillBase);
