import React from 'react';

function renderStar(className) {
  return className ? <span className={className}>★</span> : '★';
}

export default class Star extends React.Component {
  render() {
    const { className, count } = this.props;

    return Array(count).fill(renderStar(className));
  }
}

