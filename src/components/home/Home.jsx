import React from 'react';
import { connect } from 'react-redux';

import './style.css';

class Home extends React.Component {
  render() {
    return (
      <div>
        홈
      </div>
    );
  }
}

const stateMapper = undefined;

export default connect(stateMapper)(Home);
