import React from 'react';

import { Route } from 'react-router-dom';
import { Reboot } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';

import Appbar from './appbar/Appbar';
import Home from './home/Home';
import DollDict from './doll/DollDict';
import DollDetail from './dolldetail/DollDetail';
import FairyDict from './fairy/FairyDict';
import EquipDict from './equipment/EquipDict';
import Calculator from './calculator/Calculator';
import SdSimulator from './sdsim/SdSimulator';
import About from './about/About';

import './App.css';
import theme from './theme';

export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Reboot />
        <Appbar />
        <div style={{ paddingTop: 64 }} className="content">
          <Route exact path="/" component={Home} />
          <Route exact path="/doll" component={DollDict} />
          <Route path="/doll/:id" component={DollDetail} />
          <Route path="/fairy" component={FairyDict} />
          <Route path="/equip" component={EquipDict} />
          <Route path="/calculator" component={Calculator} />
          <Route path="/sdsim" component={SdSimulator} />
          <Route path="/about" component={About} />
        </div>
      </MuiThemeProvider>
    );
  }
}
