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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  linkButton: {
    textAlign: 'center',
    display: 'flex',
    margin: 10,
    textDecoration: 'none',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '40px',
  },
  link: {
    display: 'inline-block',
    marginLeft: '10px',
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
              <a className={classes.linkButton} target="_blank" rel="noopener noreferrer" href="https://github.com/36base">
                <img className={classes.icon} src={iconGithub} alt="GitHubIcon" />
                <div className={classes.link}>GitHub</div>
              </a>
              <a className={classes.linkButton} target="_blank" rel="noopener noreferrer" href="https://discord.gg/qrG9gf9" >
                <img className={classes.icon} src={iconDiscord} alt="DiscordIcon" />
                <div className={classes.link}>Discord</div>
              </a>
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
