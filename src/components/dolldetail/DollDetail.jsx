import React from 'react';
import { connect } from 'react-redux';

import './style.css';

class DollDetail extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const doll = this.props.map.get(Number(this.props.match.params.id));

    const infoBoxStyle = {
      margin: '10px 5px',
      border: '1px solid black',
      height: '200px',
    };

    return (
      <div className="dolldetail--wrapper">
        <div className="dolldetail--header">
          <span style={{ display: 'inline-block', fontSize: '20px', marginTop: '15px' }}>
            No.{doll.id}
            <span style={{ fontSize: '36px', marginLeft: '10px' }}>{doll.krName}</span>
          </span>
          <div style={{ width: '100%', height: 0, borderTop: '2px solid black' }} />
        </div>
        <div className="dolldetail--illust">
          <img style={{ maxWidth: '100%' }} src={doll.illust.common} alt="now loading" />
        </div>
        <div className="dolldetail--content" >
          <div style={infoBoxStyle} >소개</div>
          <div style={infoBoxStyle}>SD뷰어</div>
          <div style={infoBoxStyle}>버프효과</div>
          <div style={infoBoxStyle}>스킬</div>
          <div style={infoBoxStyle}>장비</div>
          <div style={infoBoxStyle}>획득처</div>
        </div>
      </div>
    );
  }
}

const stateMapper = state => ({
  map: state.doll.map,
});

export default connect(stateMapper)(DollDetail);
