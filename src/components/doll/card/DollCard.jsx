import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.css';

class DollCard extends React.Component {
  render() {
    const {
      id,
      type,
      rank,
      krName,
    } = this.props;
    const typeName = type ? this.props.typeNameMap[type] : null;
    const rankName = this.props.rankNameMap[id > 1000 ? 1 : rank];

    const typeIcon = (typeName && rank) ? require(`./resources/icons/${typeName}_${rankName}.png`) : null;
    const portrait = id ? require(`./resources/portraits/${id}.png`) : null;

    if (!(id && typeName && typeIcon && portrait)) {
      return null;
    }

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
