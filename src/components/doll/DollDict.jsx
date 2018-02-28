import React from 'react';
import { connect } from 'react-redux';

import DollCard from './card/DollCard';

class DollDict extends React.Component {
  render() {
    const dollCards = this.props.dolls.map((id) => <DollCard {...id} />);

    return (
      <div>{dollCards}</div>
    );
  }
}

let stateMapper = (state) => {
  return {
    dolls: state.doll.list,
  };
};

DollDict = connect(stateMapper)(DollDict);

export default DollDict;
