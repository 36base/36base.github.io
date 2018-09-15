import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from 'material-ui/styles';

import FairyRepository from './../../repositories/FairyRepository';
import FairyCard from './components/FairyCard';


const style = theme => ({
  wrapper: {
    width: '100%',
    [theme.breakpoints.down(2046)]: {
      width: '1520px',
      margin: '0 auto',
    },
    [theme.breakpoints.down(1856)]: {
      width: '1330px',
      margin: '0 auto',
    },
    [theme.breakpoints.down(1666)]: {
      width: '1140px',
      margin: '0 auto',
    },
    [theme.breakpoints.down(1559)]: {
      width: '1520px',
      margin: '0 auto',
    },
    [theme.breakpoints.down(1536)]: {
      width: '1330px',
      margin: '0 auto',
    },
    [theme.breakpoints.down(1346)]: {
      width: '1140px',
      margin: '0 auto',
    },
    [theme.breakpoints.down(1156)]: {
      width: '950px',
      margin: '0 auto',
    },
    [theme.breakpoints.down(966)]: {
      width: '760px',
      margin: '0 auto',
    },
    [theme.breakpoints.down(776)]: {
      width: '570px',
      margin: '0 auto',
    },
    [theme.breakpoints.down(586)]: {
      width: '380px',
      margin: '0 auto',
    },
    [theme.breakpoints.down(480)]: {
      width: '320px',
      margin: '0 auto',
    },
  },
});

class FairyDict extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };
  }
  componentWillMount() {
    FairyRepository.fetchAll()
      .then(list => this.setState({ list }));
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        {this.state.list.map(fairy => (
          <FairyCard key={fairy.id} info={fairy} />
        ))}
      </div>
    );
  }
}


const stateMapper = state => ({
  list: state.fairydict.list,
});

export default connect(stateMapper)(withRouter(withStyles(style)(FairyDict)));
