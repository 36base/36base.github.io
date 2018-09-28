import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Appbar from './Appbar';
import Menu from './Menu';
import Home from './home/Home';
import DollDict from './doll/DollDict';
import DollDetail from './dolldetail/DollDetail';
import EquipDict from './equipment/EquipDict';
import Calculator from './calculator/Calculator';
import TimeTable from './timetable/TimeTable';
import SdSimulator from './sdsim/SdSimulator';
import LogisticSupport from './logisticsupport/LogisticSupport';
import MusicPlayer from './musicplayer/MusicPlayer';
import GfDict from './gfdict/GfDict';
import About from './about/About';
import FairyDict from './fairy/FairyDict';
import FairyDetail from './fairydetail/FairyDetail';

import { resize } from '../actions/common';
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

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    // window.addEventListener('resize', this.handleResize);
    // this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    const content = document.getElementById('content');
    if (content) {
      const { width, height } = content.getBoundingClientRect();
      this.props.resize(width, height);
    }
  }

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
            <Route exact path="/" component={Home} />
            <Route exact path="/doll" component={DollDict} />
            <Route path="/doll/:id" component={DollDetail} />
            <Route path="/equip" component={EquipDict} />
            <Route exact path="/fairy" component={FairyDict} />
            <Route path="/fairy/:id" component={FairyDetail} />
            <Route path="/timetable" component={TimeTable} />
            <Route path="/calculator" component={Calculator} />
            <Route path="/sdsim" component={SdSimulator} />
            <Route path="/logisticsupport" component={LogisticSupport} />
            <Route path="/musicplayer" component={MusicPlayer} />
            <Route path="/gfdict" component={GfDict} />
            <Route path="/about" component={About} />
          </div>
        </main>
      </div>
    );
  }
}

const stateMapper = undefined;
const dispatchMapper = dispatch => ({
  resize: (width, height) => dispatch(resize(width, height)),
});

export default withStyles(style)(withRouter(connect(stateMapper, dispatchMapper)(App)));
