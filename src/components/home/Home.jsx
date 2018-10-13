import React from 'react';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { Timeline } from 'react-twitter-widgets';
import CheckList from './components/CheckList';

import './style.css';
import gfDict from './components/resources/gfdict.png';
import gfPixel from './components/resources/gfpixel.png';
import gfSimPc from './components/resources/gfsimpc.png';
import gfSimMobile from './components/resources/gfsimmobile.png';
import gfTwitter from './components/resources/gftwitter.png';
// import gfBjsn from './components/resources/bjsn.jpg'; // 갤 상황에 따라 변동
import gfMicateam from './components/resources/micateam.png';
import gfGf2 from './components/resources/gfl2.png'; // 갤 상황에 따라 변동
import gfSheet from './components/resources/gfsheet.png';
import gfTwitterJapan from './components/resources/gfTwitterJapan.png';
import gf36baseTwitterJapan from './components/resources/twitterJapan.png';
import gfKakao from './components/resources/gfkakao.png';
import mainBanner from './components/resources/36main_Terrain.png';

class Home extends React.Component {
  renderBanner = (language) => {
    switch (language) {
      case 'ko-KR':
        return (
          <div className="wrapper-banner-link">
            <a href="http://gall.dcinside.com/mgallery/board/lists/?id=gfl2" target="_blank" rel="noopener noreferrer"><img alt="DCinside 소녀전선 2 갤러리" src={gfGf2} /></a>
            <a href="http://gall.dcinside.com/mgallery/board/lists/?id=micateam" target="_blank" rel="noopener noreferrer"><img alt="DCinside MICATEAM 갤러리" src={gfMicateam} /></a>
            <a id="banner-link-twitter" href="https://twitter.com/gf_36base" target="_blank" rel="noopener noreferrer"><img alt="트위터" src={gfTwitter} /></a>
            <a id="gf-sim-mobile" href="https://play.google.com/store/apps/details?id=com.Cosmos.GfTileSim&hl=ko" target="_blank" rel="noopener noreferrer"><img alt="제대편성 시뮬레이터 모바일" src={gfSimMobile} /></a>
            <a id="gf-sim-pc" href="https://girlsfrontline.kr/db/jdsimulator" target="_blank" rel="noopener noreferrer"><img alt="제대편성 시뮬레이터 pc" src={gfSimPc} /></a>
            <a href="http://gall.dcinside.com/mgallery/board/view/?id=gfl2&no=410693" target="_blank" rel="noopener noreferrer"><img alt="소녀 픽셀던젼" src={gfPixel} /></a>
            <a href="https://play.google.com/store/apps/details?id=com.gfl.dic" target="_blank" rel="noopener noreferrer"><img alt="소전사전" src={gfDict} /></a>
            <a href="https://docs.google.com/spreadsheets/d/1IxJxfpBHboVRJe92_GPC6iUZCq1M2NJkbtKo6SP-3SM/pubhtml" target="_blank" rel="noopener noreferrer"><img alt="소전시트" src={gfSheet} /></a>
            <a href="http://pf.kakao.com/_MaxmXC" target="_blank" rel="noopener noreferrer"><img alt="36베이스 플러스친구" src={gfKakao} /></a>
          </div>
        );
      case 'ja-JP':
        return (
          <div className="wrapper-banner-link">
            <a href="https://twitter.com/GirlsFrontline" target="_blank" rel="noopener noreferrer"><img alt="ドルプロ公式 Twitter" src={gfTwitterJapan} /></a>
            <a href="https://twitter.com/gf_36base" target="_blank" rel="noopener noreferrer"><img alt="36ベース Twitter" src={gf36baseTwitterJapan} /></a>
          </div>
        );
      default:
        return (
          <div className="wrapper-banner-link">
            <a href="http://gall.dcinside.com/mgallery/board/lists/?id=gfl2" target="_blank" rel="noopener noreferrer"><img alt="DCinside 소녀전선 2 갤러리" src={gfGf2} /></a>
            <a href="http://gall.dcinside.com/mgallery/board/lists/?id=micateam" target="_blank" rel="noopener noreferrer"><img alt="DCinside MICATEAM 갤러리" src={gfMicateam} /></a>
            <a id="banner-link-twitter" href="https://twitter.com/gf_36base" target="_blank" rel="noopener noreferrer"><img alt="트위터" src={gfTwitter} /></a>
            <a id="gf-sim-mobile" href="https://play.google.com/store/apps/details?id=com.Cosmos.GfTileSim&hl=ko" target="_blank" rel="noopener noreferrer"><img alt="제대편성 시뮬레이터 모바일" src={gfSimMobile} /></a>
            <a id="gf-sim-pc" href="https://girlsfrontline.kr/db/jdsimulator" target="_blank" rel="noopener noreferrer"><img alt="제대편성 시뮬레이터 pc" src={gfSimPc} /></a>
            <a href="http://gall.dcinside.com/mgallery/board/view/?id=gfl2&no=410693" target="_blank" rel="noopener noreferrer"><img alt="소녀 픽셀던젼" src={gfPixel} /></a>
            <a href="https://play.google.com/store/apps/details?id=com.gfl.dic" target="_blank" rel="noopener noreferrer"><img alt="소전사전" src={gfDict} /></a>
            <a href="https://docs.google.com/spreadsheets/d/1IxJxfpBHboVRJe92_GPC6iUZCq1M2NJkbtKo6SP-3SM/pubhtml" target="_blank" rel="noopener noreferrer"><img alt="소전시트" src={gfSheet} /></a>
            <a href="http://pf.kakao.com/_MaxmXC" target="_blank" rel="noopener noreferrer"><img alt="36베이스 플러스친구" src={gfKakao} /></a>
          </div>
        );
    }
  }

  render() {
    const { i18n } = this.props;
    return (
      <div className="body-content">
        <div className="banner-main">
          <img alt="36베이스 메인배너" src={mainBanner} />
        </div>
        <div className="wrapper-checklist">
          <CheckList className="checklist" />
        </div>
        { this.renderBanner(i18n.language) }
        <div className="wrapper-content-twitter">
          <Timeline
            dataSource={{
              sourceType: 'profile',
              screenName: 'gf_36base',
            }}
            options={{
              height: '45vh',
            }}
          />
        </div>
        <div className="wrapper-content-discord">
          <iframe
            title="discord"
            src="https://discordapp.com/widget?id=415714351660662784&theme=dark"
          />
        </div>
      </div>
    );
  }
}

export default compose(
  translate(),
)(Home);
