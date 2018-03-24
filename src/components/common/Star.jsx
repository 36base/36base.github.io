import React from 'react';

function renderStar(i, className) {
  return className ? <span key={`star${i}`} className={className}>★</span> : '★';
}

export default class Star extends React.Component {
  render() {
    const { className, count } = this.props;

    return Array(count).fill().map((_, i) => renderStar(i, className));
  }
}
