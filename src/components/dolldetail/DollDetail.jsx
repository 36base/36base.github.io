import React from 'react';
import { connect } from 'react-redux';

import './DollDetail.css';

function getLayout(width, height) {
  const w = width / 5;
  const p = height / (w / 2 + height) * 100;
  const bgGradation1 = `linear-gradient(${Math.atan2(height, w) * (180 / Math.PI)}deg, #505694 50%, transparent 50%)`;
  const bgGradation2 = `linear-gradient(-45deg, transparent ${p}%, #8C94BF ${p}%`;

  const background = {
    position: 'fixed',
    left: 0,
    top: 64,
    width: width / 5,
    height,
    background: [bgGradation1, bgGradation2].join(','),
  };

  const illust = {
    position: 'fixed',
    left: width * 0.1,
    top: 64,
    width: width * 0.45,
    height,
  };

  const information = {
    marginLeft: width * 0.55,
    height: 1000,
  };

  return { background, illust, information };
}

class DollDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = getLayout(props.width, props.height);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(newProps) {
    this.setState(getLayout(newProps.width, newProps.height));
  }

  render() {
    const info = this.props.map.get(Number(this.props.match.params.id));
    const { background, illust, information } = this.state;

    return (
      <div>
        <div className="doll-detail__background" style={background} />
        <div className="doll-detail__illust" style={illust} >으앙</div>
        <div className="doll-detail__informations" style={information} />
      </div>
    );
  }
}

const stateMapper = state => ({
  map: state.doll.map,
  width: state.common.width,
  height: state.common.height,
});
const dispatchMapper = undefined;

export default connect(stateMapper, dispatchMapper)(DollDetail);
