import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import DollCard from '../../components/Doll/DollCard';
import SearchBar from '../../components/SearchBar';

import Predicate from '../../repositories/data/predicate';

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
  state = {
    filter: {
      rank: [],
      type: [],
      name: [],
    },
  };

  addFilter = type => (newData) => {
    this.setState(prevState => ({
      ...prevState,
      filter: {
        ...prevState.filter,
        [type]: [...prevState.filter[type], newData],
      },
    }));
  }

  removeFilter = type => (target) => {
    this.setState(prevState => ({
      ...prevState,
      filter: {
        ...prevState.filter,
        [type]: prevState.filter[type].filter(e => (
          (typeof target === 'string') ? (e.indexOf(target) !== 0) : (e !== target)
        )),
      },
    }));
  }

  render() {
    const {
      t,
      classes,
      dolls,
    } = this.props;
    const { filter } = this.state;

    const searchData = {
      rank: {
        type: 'checkbox',
        label: t('Stat.rarity'),
        data: [
          { value: '2', label: `2${t('PageMessage.Star')}` },
          { value: '3', label: `3${t('PageMessage.Star')}` },
          { value: '4', label: `4${t('PageMessage.Star')}` },
          { value: '5', label: `5${t('PageMessage.Star')}` },
          { value: '1', label: 'Extra' },
        ],
        action: {
          add: this.addFilter('rank'),
          remove: this.removeFilter('rank'),
        },
      },
      type: {
        type: 'checkbox',
        label: t('PageMessage.Type'),
        data: [
          { value: 'hg', label: t('PageMessage.Doll.Type.hg') },
          { value: 'smg', label: t('PageMessage.Doll.Type.smg') },
          { value: 'ar', label: t('PageMessage.Doll.Type.ar') },
          { value: 'rf', label: t('PageMessage.Doll.Type.rf') },
          { value: 'mg', label: t('PageMessage.Doll.Type.mg') },
          { value: 'sg', label: t('PageMessage.Doll.Type.sg') },
        ],
        action: {
          add: this.addFilter('type'),
          remove: this.removeFilter('type'),
        },
      },
      name: {
        type: 'input',
        label: t('PageMessage.Name, Alias'),
        action: {
          add: this.addFilter('name'),
          remove: this.removeFilter('name'),
        },
      },
    };

    return (
      <Grid className={classes.wrapper} container>
        <Grid item xs={12}>
          <SearchBar data={searchData} />
        </Grid>
        <Grid className={classes.cardWrapper}>
          {dolls.filter(doll => Predicate.dollPredicate(t, filter)(doll)).map(doll => (
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
  const { dolls } = state.testDollDict;

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
