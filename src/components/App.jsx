import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { CssBaseline } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import Appbar from './Appbar';
import Menu from './Menu';
import Home from './home/Home';
import DollDict from './doll/DollDict';
import DollDetail from './dolldetail/DollDetail';
import FairyDict from './fairy/FairyDict';
import EquipDict from './equipment/EquipDict';
import Calculator from './calculator/Calculator';
import SdSimulator from './sdsim/SdSimulator';
import About from './about/About';

import { resize } from '../actions/common';
import './App.css';

const style = theme => ({
  root: {
    display: 'flex',
    alignItems: 'stretch',
    height: '100%',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 0,
    minWidth: 0,
    overflow: 'auto',
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
          <div style={{ width: '100%', height: 'calc(100% - 64px)' }}>
            <Route exact path="/" component={Home} />
            <Route exact path="/doll" component={DollDict} />
            <Route path="/doll/:id" component={DollDetail} />
            <Route path="/fairy" component={FairyDict} />
            <Route path="/equip" component={EquipDict} />
            <Route path="/calculator" component={Calculator} />
            <Route path="/sdsim" component={SdSimulator} />
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
