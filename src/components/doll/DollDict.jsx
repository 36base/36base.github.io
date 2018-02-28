import React from 'react';
import { connect } from 'react-redux';

import DollCard from './card/DollCard';

class DollDict extends React.Component {
  render() {
    const dollCards = this.props.dolls.map(info => <DollCard key={info.id} {...info} />);

    return (
      <div>{dollCards}</div>
    );
  }
}

const stateMapper = state => ({
  dolls: state.doll.list,
});

export default connect(stateMapper)(DollDict);
