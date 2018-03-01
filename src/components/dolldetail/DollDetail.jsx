import React from 'react';

class DollDetail extends React.Component {
  render() {
    const { id } = this.props.match.params;

    return (
      <div>
        <h1>인형상세</h1>
        <p>{id}</p>
      </div>
    );
  }
}

export default DollDetail;
