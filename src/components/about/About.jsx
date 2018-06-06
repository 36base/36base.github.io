import React from 'react';
import { Grid, Card } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import data from './data';

const style = ({
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
  name: {
    fontSize: '20px',
    marginTop: '10px',
    marginBottom: '10px',
  },
  role: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '10px',
    marginBottom: '10px',
  },
  impression: {
    fontSize: '15px',
    marginTop: '10px',
    marginBottom: '10px',
  },
  linkWrapper: {
    justifyContent: 'center',
  },
  linkButton: {
    textAlign: 'center',
    margin: '20px',
    padding: '20px',
    border: 'solid',
    borderColor: 'gray',
    borderWidth: '1px',
    borderRadius: '30px',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
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
                <div className={classes.name}>{item.name}</div>
                <div className={classes.role}>{item.role}</div>
                <div className={classes.impression}>{item.impression}</div>
              </Card>
            ))}
          </Grid>
        </div>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>contact us</h1>
          <Grid container className={classes.linkWrapper}>
            <Grid item xs={12} md={3} className={classes.linkButton}>
              <a className={classes.link} href="https://github.com/36base">GitHub Link</a>
            </Grid>
            <Grid item xs={12} md={3} className={classes.linkButton}>
              <a className={classes.link} href="https://discord.gg/qrG9gf9">Discord Link</a>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(style)(About);
