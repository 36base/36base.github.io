import React from 'react';
import { connect } from 'react-redux';
import { Timeline } from 'react-twitter-widgets';
import CheckList from './components/CheckList';

import './style.css';
import gfDict from './components/resources/gfdict.png';
import gfPixel from './components/resources/gfpixel.png';
// import gfSim from './components/resources/gfsim.png';
import gfSimPc from './components/resources/gfsimpc.png';
import gfSimMobile from './components/resources/gfsimmobile.png';
import gfTwitter from './components/resources/gftwitter.png';
// import gfBjsn from './components/resources/bjsn.jpg';
import gfl2 from './components/resources/gfl2.png';
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
          <CheckList className="checklist" />
        </div>
        <div className="wrapper-banner-link">
          <a href="http://gall.dcinside.com/mgallery/board/lists/?id=gfl2" target="_blank" rel="noopener noreferrer" ><img alt="DCinside 소녀전선2갤러리" src={gfl2} /></a>
          <a href="http://gall.dcinside.com/mgallery/board/lists/?id=micateam" target="_blank" rel="noopener noreferrer" ><img alt="DCinside MICATEAM 갤러리" src={gfMicateam} /></a>
          <a id="banner-link-twitter" href="https://twitter.com/gf_36base" target="_blank" rel="noopener noreferrer" ><img alt="트위터" src={gfTwitter} /></a>
          <a id="gf-sim-mobile" href="https://play.google.com/store/apps/details?id=com.Cosmos.GfTileSim&hl=ko" target="_blank" rel="noopener noreferrer" ><img alt="제대편성 시뮬레이터 모바일" src={gfSimMobile} /></a>
          <a id="gf-sim-pc" href="https://girlsfrontline.kr/db/jdsimulator" target="_blank" rel="noopener noreferrer" ><img alt="제대편성 시뮬레이터 pc" src={gfSimPc} /></a>
          <a href="https://app.box.com/s/ksvd0luvs9f8i21b7185585oze6nss0t" target="_blank" rel="noopener noreferrer" ><img alt="소녀 픽셀던젼" src={gfPixel} /></a>
          <a href="https://play.google.com/store/apps/details?id=com.soomae.gfl&hl=ko" target="_blank" rel="noopener noreferrer" ><img alt="소전사전" src={gfDict} /></a>
          <a href="https://docs.google.com/spreadsheets/d/1IxJxfpBHboVRJe92_GPC6iUZCq1M2NJkbtKo6SP-3SM/pubhtml" target="_blank" rel="noopener noreferrer" ><img alt="소전시트" src={gfSheet} /></a>
        </div>
        <div className="wrapper-content-twitter">
          <Timeline
            dataSource={{
              sourceType: 'profile',
              screenName: 'gf_36base',
            }}
            options={{
              height: '90vh',
            }}
          />
        </div>
      </div>
    );
  }
}

const stateMapper = undefined;

export default connect(stateMapper)(Home);
