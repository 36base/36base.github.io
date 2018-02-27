import React from 'react';

import icon from './resources/icons/HG_4Star.png';
import pic from './resources/portraits/1.png';
import cardbg from './resources/cardbg.png';

import './style.css';

class DollCard extends React.Component {

  render() {
    return (
      <div className={`dollcard start4`}>
        <img className="dollcard--typeicon" src={icon} />
        <div className={`dollcard--header`}>
          ★★★★
        </div>
        <div className="dollcard--content">
          <img style={{left: '-170px', width: '340px'}} src={pic} />
        </div>
        <div className="dollcard--namebar">콜트 리볼버</div>
        <div className={`dollcard--footer`}>
          권총
          <span className="dollcard--footer--no">1</span>
        </div>
      </div>
    );
  }
}

export default DollCard;
