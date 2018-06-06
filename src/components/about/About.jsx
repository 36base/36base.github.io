import React from 'react';
import { Grid, Card } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import data from './data';

const style = theme => ({
  container: {
    width: '100%',
    height: '100%',
  },
  wrapper: {
    marginBottom: '100px',
  },
  title: {
    textAlign: 'center',
    margin: '20px',
  },
  cardContainer: {
    justifyContent: 'center',
  },
  card: {
    width: '300px',
    padding: '10px',
    margin: '10px',
    textAlign: 'center',
  },
  profile: {
    width: '128px',
    borderRadius: '50%',
  },
  impression: {
    fontSize: '15px',
    marginTop: '10px',
    marginBottom: '10px',
  },
  footer: {
    backgroundColor: '#37474F',
    display: 'flex',
    flexDirection: 'flex-end',
  },
  titleWrapper: {
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      marginLeft: '30px',
    },
  },
  linkWrapper: {
    justifyContent: 'center',
  },
  linkButton: {
    textAlign: 'center',
    padding: '10px',
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bolder',
  },
});

class About extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>developer</h1>
          <Grid container className={classes.cardContainer}>
            {data.map(item => (
              <Card className={classes.card} key={item.name} >
                {item.profile ? <img src={item.profile} alt="profile" className={classes.profile} /> : <div />}
                <h3 className={classes.name}>{item.name}</h3>
                <h4 className={classes.role}>{item.role}</h4>
                <div className={classes.impression}>{item.impression}</div>
              </Card>
            ))}
          </Grid>
        </div>
        <footer className={classes.footer}>
          <Grid container style={{ justifyContent: 'center', alignItems: 'center' }} >
            <Grid item xs={12} md={8}>
              <div className={classes.titleWrapper}>
                <h1 style={{ display: 'inline-block', color: 'white' }} className={classes.title}>Contact us</h1>
                <h2 style={{ display: 'inline-block', color: 'gray' }}>36 베이스</h2>
              </div>
            </Grid>
            <Grid item xs={12} md={4} container className={classes.linkWrapper}>
              <Grid item xs={12} md={6} className={classes.linkButton}>
                <a className={classes.link} href="https://github.com/36base">GitHub Link</a>
              </Grid>
              <Grid item xs={12} md={6} className={classes.linkButton}>
                <a className={classes.link} href="https://discord.gg/qrG9gf9">Discord Link</a>
              </Grid>
            </Grid>
          </Grid>
        </footer>
      </div>
    );
  }
}

export default withStyles(style)(About);
