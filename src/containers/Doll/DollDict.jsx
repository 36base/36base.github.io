import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import DollCard from '../../components/Doll/DollCard';
// import SearchBar from './components/SearchBar';

const style = theme => ({
  wrapper: {
    width: '100%',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '0 auto',
    },
    [theme.breakpoints.up('md')]: {
      minWidth: 660,
    },
  },
  cardWrapper: {
    width: '1520px',
    margin: '0 auto',
    [theme.breakpoints.down(1857)]: {
      width: '1330px',
    },
    [theme.breakpoints.down(1667)]: {
      width: '1140px',
    },
    [theme.breakpoints.down(1560)]: {
      width: '1330px',
    },
    [theme.breakpoints.down(1370)]: {
      width: '1140px',
    },
    [theme.breakpoints.down(1180)]: {
      width: '950px',
    },
    [theme.breakpoints.down(990)]: {
      width: '760px',
    },
    [theme.breakpoints.down(800)]: {
      width: '570px',
    },
    [theme.breakpoints.down(610)]: {
      width: '380px',
    },
    [theme.breakpoints.down(480)]: {
      width: '320px',
    },
  },
});

// eslint-disable-next-line react/prefer-stateless-function
class DollDict extends React.Component {
  render() {
    const { t, classes, dolls } = this.props;

    // <Grid item xs={12}>
    //   <SearchBar />
    // </Grid>

    return (
      <Grid className={classes.wrapper} container>
        <Grid className={classes.cardWrapper}>
          {dolls.map(doll => (
            <DollCard
              key={doll.id}
              id={doll.id}
              codename={doll.codename}
              name={t(doll.name)}
              type={doll.type}
              rank={doll.rank}
            />
          ))}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  const { dolls } = state.dollDict;

  return {
    dolls: Object.keys(dolls).map(e => dolls[e]),
  };
};

export default compose(
  translate(),
  connect(mapStateToProps),
  withRouter,
  withStyles(style),
)(DollDict);
