import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Grid, Typography } from 'material-ui';

import './DollDetail.css';
import DollDetailHeader from './DollDetailHeader';

function getLayout(width, height) {
  const w = width / 5;
  const p = height / (w * 0.7 + height) * 100;
  const bgGradation1 = `linear-gradient(${Math.atan2(height, w * 0.8) * (180 / Math.PI)}deg, #505694 50%, transparent 50%)`;
  const bgGradation2 = `linear-gradient(-60deg, transparent ${p}%, #8C94BF ${p}%`;

  const background = {
    position: 'fixed',
    left: 0,
    top: 64,
    width: width / 5,
    height: height - 64,
    background: [bgGradation1, bgGradation2].join(','),
    zIndex: 20,
  };

  const header = {
    position: 'fixed',
    left: 0,
    top: 64,
    width: '100%',
    backgroundColor: '#FAFAFA',
    zIndex: 10,
  };

  const illust = {
    position: 'fixed',
    left: width * 0.1,
    top: 160,
    width: width * 0.45,
  };

  const information = {
    marginLeft: width * 0.55,
    marginTop: 96,
  };

  return { background, header, illust, information };
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
    const { background, header, illust, information } = this.state;

    return (
      <div>
        <div className="doll-detail__background" style={background} />
        <DollDetailHeader pos={header} id={info.id} krName={info.krName} rank={info.rank} />
        <div className="doll-detail__illust" style={illust} >
          <img  style={{width: '100%'}} src={info.illust.common} />
        </div>
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
