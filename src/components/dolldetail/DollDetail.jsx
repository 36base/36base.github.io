import React from 'react';
import { connect } from 'react-redux';

class DollDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      container: {},
      header: {},
      illust: {},
      info: {},
    };

    this.updatePosition = this.updatePosition.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updatePosition);
    this.updatePosition();
  }

  componentWillUnmount() {
    window.addEventListener('resize', this.updatePosition);
  }

  updatePosition() {
    const {
      x,
      y,
      width,
      height,
    } = document.getElementById('doll-detail').getBoundingClientRect();
    const left = Math.max(400, width * 0.3);

    const container = {
      paddingLeft: `${left}px`,
      paddingTop: '85px',
    };

    const header = {
      left: `${x}px`,
      top: `${y}px`,
      width: `${width}px`,
      height: '85px',
    };

    const illust = {
      left: `${x}px`,
      top: `${y + 85}px`,
      width: `${left}px`,
      height: `${height - 85}px`,
    };

    const info = {
      width: `${width - left}px`,
    };

    this.setState({ container, header, illust, info });
  }

  render() {
    const { container, header, illust, info } = this.state;
    return (
      <div id="doll-detail" style={{ width: '100%', height: '100%', ...container }}>
        <div style={{ position: 'fixed', ...header }}>헤더헤더</div>
        <div style={{ position: 'fixed', ...illust }}>일러일러</div>
        <div style={{ ...info, }} > 

        </div>
      </div>
    );
  }
}

const stateMapper = state => ({
  ...state.doll.map.get(1),
});

export default connect(stateMapper)(DollDetail);
