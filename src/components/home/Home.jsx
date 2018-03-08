import React from 'react';

import './style.css';
import DollDetailInfoBox from '../dolldetail/DollDetailInfoBox';

export default class Home extends React.Component {
  render() {
    return (
      <div className="body-content">
        <DollDetailInfoBox />
      </div>
    );
  }
}
