import React from 'react';
import { Grid, Typography, Divider } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const style = {
  container: {
    paddingTop: '2.5%',
    paddingLeft: '10%',
    paddingRight: 25,
  },
  caption: {
    paddingLeft: 20,
  },
  noBox: {
    display: 'flex',
    flexDirection: 'column-reverse',
    color: '#62727B',
  },
  divider: {
    height: 3,
    backgroundColor: '#102027',
  },
  starBox: {
    color: '#FDA50C',
    paddingRight: 20,
  }
};

class DollDetailHeader extends React.Component {
  render() {
    const { classes, pos, id, krName, rank } = this.props;

    return (
      <div style={pos}>
        <Grid className={classes.container} container >
          <Grid item xs={6} >
            <Typography className={classes.caption} variant="caption" color="primary" align="left" >{krName}</Typography>
          </Grid>
          <Grid className={classes.noBox} item xs={6} >
            <Typography variant="display3" align="right" >No.{id}</Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={12} >
          <Typography className={classes.starBox} variant="display2" align="right">
            {Array(rank).fill('★')}
          </Typography>
        </Grid>
      </div>
    );
  }
}

export default withStyles(style)(DollDetailHeader);
