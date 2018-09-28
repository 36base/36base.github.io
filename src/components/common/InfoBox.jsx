import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import HorizonLine from './HorizonLine';

const style = theme => ({
  container: {
    position: 'relative',
    width: '100%',
  },
  name: {
    fontSize: '1.25rem',
    color: 'grey',
    paddingLeft: theme.spacing.unit * 2,
  },
  selector: {
    textAlign: 'right',
  },
  content: {
    padding: theme.spacing.unit * 2,
  },
});

const InfoBox = (props) => {
  const {
    classes,
    name,
    children,
    selector,
  } = props;
  const content = props.wrapContent ? <div className={classes.content}>{children}</div> : children;

  return (
    <div className={classes.container}>
      <Grid container>
        <Grid item xs={selector ? 4 : 12}>
          <Typography className={classes.name}>{name}</Typography>
        </Grid>
        {selector ? <Grid className={classes.selector} item xs={8}>{selector}</Grid> : ''}
      </Grid>
      <HorizonLine />
      {content}
    </div>
  );
};

export default withStyles(style)(InfoBox);
