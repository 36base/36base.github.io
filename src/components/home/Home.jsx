import React from 'react';
import {connect} from 'react-redux';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import CheckList from './components/CheckList';

import './style.css';
import gfDict from './components/resources/gfdict.png';
import gfPixel from './components/resources/gfpixel.png';
import gfSim from './components/resources/gfsim.png';
import gfTwitter from './components/resources/gftwitter.png';
import gfBjsn from './components/resources/bjsn.jpg';
import gfMicateam from './components/resources/micateam.png';
import gfSheet from './components/resources/gfsheet.png';
import mainBanner from './components/resources/36main_Terrain.png';

class Home extends React.Component {
  render() {
    return (
      <div className="body-content">
        <div className="banner-main">
          <img alt="36베이스 메인배너" src={mainBanner} />
        </div>
        <div className="wrapper-checklist">
          <CheckList className="checklist"/>
        </div>
        <div className="wrapper-banner-link">
          <img alt="DCinside 빵집소녀갤러리" src={gfBjsn} />
          <img alt="제대편성 시뮬레이터" src={gfSim} />
          <img alt="DCinside micateam갤러리" src={gfMicateam} />
          <img alt="소녀 픽셀던젼" src={gfPixel} />
          <img alt="소전사전" src={gfDict} />
          <img alt="소전시트" src={gfSheet} />
          <img id="banner-link-twitter" alt="트위터" src={gfTwitter} />
        </div>
        <div className="wrapper-content-twitter">
          <TwitterTimelineEmbed sourceType="profile" userId={3247835011} options={{ height: '90vh' }} />
        </div>
      </div>
    );
  }
}

const stateMapper = undefined;

export default connect(stateMapper)(Home);
