import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.css';

class DollCard extends React.Component {
  render() {
    const {
      id,
      rank,
      rankName,
      typeIcon,
      portrait,
      krName,
    } = this.props;

    return (
      <Link to={`/doll/${id}`} className="dollcard--wrapper" >
        <div className="dollcard undraggable">
          <img className="dollcard--typeicon" src={typeIcon} alt="로딩중입니다" />
          <div className="dollcard--rankbar">
            {Array(rank).fill(<span className="dollcard--rankbar--star">★</span>)}
          </div>
          <div className="dollcard--portrait" style={{ backgroundImage: `url(${portrait})` }} />
          <div className={`dollcard--namebar ${rankName}`}>{krName}</div>
          <div className="dollcard--no">{id}</div>
        </div>
      </Link>
    );
  }
}

const stateMapper = state => ({
  typeNameMap: state.doll.typeNameMap,
  rankNameMap: state.doll.rankNameMap,
});

export default connect(stateMapper)(DollCard);
