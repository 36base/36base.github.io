import React from 'react';
import { Grid, Typography, Divider } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const style = theme => ({
  caption: {
    paddingLeft: 'calc(10% + 100px)',
  },
  no: {
    display: 'flex',
    flexDirection: 'column-reverse',
    color: '#62727B',
  },
  star: {
    color: '#FDA50C',
  },
  divider: {
    width: '100%',
    height: 3,
    backgroundColor: theme.palette.primary.dark,
  },
});

class DollDetailHeader extends React.Component {
  render() {
    const { classes, info } = this.props;

    return (
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.caption} variant="caption" color="primary" align="left" >{info.krName}</Typography>
        </Grid>
        <Grid className={classes.no} item xs={12} sm={6}>
          <Typography variant="display3" align="right" >No.{info.id}</Typography>
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={12}>
          <Typography className={classes.star} variant="display2" align="right" >
            {Array(info.rank).fill('★')}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(style)(DollDetailHeader);
