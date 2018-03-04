import React from 'react';

import './illustBox.css';

function isSkin(skinNo) {
  return Number.isInteger(skinNo);
}

class DollDetailIllustBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      skinNo: 0,
    };

    this.handleTabChange = this.handleTabChange.bind(this);
    this.renderTab = this.renderTab.bind(this);
    this.renderIllust = this.renderIllust.bind(this);
  }

  handleTabChange(i) {
    this.setState({ skinNo: i });
  }

  renderTab(skin, i) {
    const className = this.state.skinNo === i ? 'doll-detail__tab active' : 'doll-detail__tab';
    return (
      <span key={skin.name} className={className} onClick={() => this.handleTabChange(i)} >
        {skin.name}
      </span>
    );
  }

  renderIllust() {
    const { skinNo } = this.state;
    const { info } = this.props;

    const illust = isSkin(skinNo) ?
      info.skinList[skinNo].illust.common :
      info.illust.common;

    return (
      <img className="doll-detail__illust" src={illust} alt="이미지" />
    );
  }

  render() {
    const { pos, info } = this.props;

    return (
      <div className="undraggable doll-detail__wrapper" style={pos} >
        <div className="doll-detail__tab-container" >
          <span 
            className={`doll-detail__tab ${!Number.isInteger(this.state.skinNo) && 'active'}`}
            onClick={() => this.handleTabChange()}
          >
            기본
          </span>
          {info.skinList.map(this.renderTab)}
          <span className="doll-detail__tab-filler" />
        </div>
        {this.renderIllust()}
      </div>
    );
  }
}

export default DollDetailIllustBox;
