import React from 'react';
import { connect } from 'react-redux';

class DollDetail extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.krName}</h1>
      </div>
    );
  }
}

const stateMapper = state => ({
  ...state.doll.list[0],
});

export default connect(stateMapper)(DollDetail);
