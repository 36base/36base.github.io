import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Appbar from './components/Appbar';
import Menu from './components/Menu';
import Home from './components/home/Home';
import Calculator from './components/calculator/Calculator';
import SdSimulator from './components/sdsim/SdSimulator';
import LogisticSupport from './components/logisticsupport/LogisticSupport';
import MusicPlayer from './components/musicplayer/MusicPlayer';
import GfDict from './components/gfdict/GfDict';
import About from './components/about/About';
import TimeTable from './containers/TimeTable/TimeTable';
import DollDict from './containers/Doll/DollDict';
import DollDetail from './containers/Doll/DollDetail';
import EquipDict from './containers/Equip/EquipDict';
import FairyDict from './containers/Fairy/FairyDict';
import FairyDetail from './containers/Fairy/FairyDetail';

import Page404 from './components/Page404';

import { resize } from './store/modules/common';
import './App.css';

const style = theme => ({
  root: {
    height: '100%',
  },
  content: {
    height: 'calc(100% - 64px)',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 0,
    minWidth: 0,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 320,
      paddingRight: 0,
    },
  },
  container: {
    width: '100%',
    height: '100%',
  },
  mixin: theme.mixins.toolbar,
});

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Appbar />
        <Menu />
        <main id="content" className={classes.content}>
          <div className={classes.mixin} />
          <div className={classes.container}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/doll" component={DollDict} />
              <Route path="/doll/:id" component={DollDetail} />
              <Route path="/equip/:id?" component={EquipDict} />
              <Route exact path="/fairy" component={FairyDict} />
              <Route path="/fairy/:id" component={FairyDetail} />
              <Route path="/timetable" component={TimeTable} />
              <Route path="/calculator" component={Calculator} />
              <Route path="/sdsim" component={SdSimulator} />
              <Route path="/logisticsupport" component={LogisticSupport} />
              <Route path="/musicplayer" component={MusicPlayer} />
              <Route path="/gfdict" component={GfDict} />
              <Route path="/about" component={About} />

              <Route component={Page404} />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

const dispatchMapper = dispatch => ({
  resize: (width, height) => dispatch(resize({ width, height })),
});

export default withStyles(style)(withRouter(connect(null, dispatchMapper)(App)));
