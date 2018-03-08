import React from 'react';

export default class Star extends React.Component {
  starRender(count, startClassName) {
    let component;

    for (let i = 0; i < count; i += 1) {
      component.push(<span key={i} className={startClassName}>★</span>);
    }

    return component;
  }

  render() {
    return (
      <div className={this.props.wraperClassName}>
        {this.starRender(this.props.starCount, this.props.starClassName)}
      </div>
    );
  }
}

