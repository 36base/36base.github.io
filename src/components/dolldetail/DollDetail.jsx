import React from 'react';
import { connect } from 'react-redux';

import DollDetailIllustBox from './DollDetailIllustBox';
import DollDetailInfoBox from './DollDetailInfoBox';

class DollDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getRects(props.width);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(newProps) {
    this.setState(this.getRects(newProps.width));
  }

  getRects(width) {
    const rootWidth = Math.min(1024, width);
    const rootLeft = (width - rootWidth) / 2;

    const rootRect = {
      width: rootWidth,
      marginLeft: rootLeft,
      marginRight: rootLeft,
    };
    const headerRect = {
      position: 'fixed',
      left: rootLeft,
      top: 64,
      width: rootWidth,
      height: 64,
      lineHeight: '32px',
      padding: '16px 0',
      verticalAlign: 'middle',
      backgroundColor: '#FAFAFA',
    };
    const asideRect = {
      position: 'fixed',
      left: rootLeft,
      top: 128,
      width: rootWidth / 2,
    };
    const contentRect = {
      marginTop: 64,
      marginLeft: rootWidth / 2,
      height: 1000,
    };

    return {
      rootRect,
      headerRect,
      asideRect,
      contentRect,
    };
  }

  render() {
    const info = this.props.map.get(Number(this.props.match.params.id));

    return (
      <div style={this.state.rootRect}>
        <div style={this.state.headerRect}>
          No.{info.id}
          <h1 style={{display: 'inline', marginLeft: '5px'}}>{info.krName}</h1>
        </div>
        <DollDetailIllustBox pos={this.state.asideRect} info={info} />
        <DollDetailInfoBox pos={this.state.contentRect} info={info} />
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
