import React from 'react';
import { Grid, Card } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import data from './data';

const style = ({
  container: {
    width: '100%',
    height: '100%',
  },
  developerWrapper: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  contactWrapper: {
    marginTop: '20px',
    marginBottom: '20px',
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
  linkButton: { },
});

class About extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.developerWrapper}>
          <h1 className={classes.title}>개발진</h1>
          <Grid container className={classes.cardContainer}>
            {data.map(item => (
              <Card className={classes.card}>
                {item.profile ? <img src={item.profile} alt="profile" className={classes.profile} /> : <div />}
                <div className={classes.name}>{item.name}</div>
                <div className={classes.role}>{item.role}</div>
                <div className={classes.impression}>{item.impression}</div>
              </Card>
            ))}
          </Grid>
        </div>
        <div className={classes.contactWrapper}>
          <h1 className={classes.title}>contact</h1>
          <div>
            <a className={classes.linkButton} href="https://github.com/36base">GitHub Link</a>
            <a className={classes.linkButton} href="https://discord.gg/qrG9gf9">Discord Link</a>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(style)(About);
