import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from 'material-ui/styles';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

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
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);

    const { cookies } = props;

    let langState = cookies.get('lang');

    if (langState === undefined) {
      langState = 'ko';
    }

    this.state = {
      languageName: langState,
    };
  }
  render() {
    const { list, classes } = this.props;
    return (
      <div className={classes.wrapper}>
        {list.map(fairy => <FairyCard lang={this.state.languageName} key={fairy.id} {...fairy} />)}
      </div>
    );
  }
}


const stateMapper = state => ({
  list: state.fairydict.list,
});

export default connect(stateMapper)(withRouter(withStyles(style)(withCookies(FairyDict))));
