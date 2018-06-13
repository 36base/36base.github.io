import React from 'react';
import { Grid, Card } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import iconDiscord from './img/discord.png';
import iconGithub from './img/github.png';

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
    margin: '40px',
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
  contactWrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
    padding: '20px',
    [theme.breakpoints.down('sm')]: {
      margin: '0px 30px',
    },
  },
  linkWrapper: {
    justifyContent: 'center',
  },
  linkButton: {
    textAlign: 'center',
    padding: '10px',
    margin: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '40px',
  },
  link: {
    display: 'inline-block',
    marginLeft: '10px',
    textDecoration: 'none',
    color: 'black',
    fontSize: '25px',
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
                <h3>{item.name}</h3>
                <h4>{item.role}</h4>
                <div className={classes.impression}>{item.impression}</div>
              </Card>
            ))}
          </Grid>
        </div>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>Contact Us</h1>
          <Card className={classes.contactWrapper}>
            <h1 style={{ color: 'gray' }} >36 베이스</h1>
            <div className={classes.linkWrapper}>
              <div className={classes.linkButton}>
                <img className={classes.icon} src={iconGithub} alt="GitHubIcon" />
                <a className={classes.link} href="https://github.com/36base">GitHub</a>
              </div>
              <div className={classes.linkButton}>
                <img className={classes.icon} src={iconDiscord} alt="DiscordIcon" />
                <a className={classes.link} href="https://discord.gg/qrG9gf9">Discord</a>
              </div>
            </div>
            <div>
              &copy; 2018 Digital Sky Entertainment Limited. All rights reserved.
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default withStyles(style)(About);
