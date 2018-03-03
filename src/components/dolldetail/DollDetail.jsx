import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { Grid, Divider, Typography, Paper } from 'material-ui';

import style from './style';

class DollDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getRects(props.width);
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
      left: rootLeft,
      top: 64,
      width: rootWidth,
      height: 64,
    };
    const asideRect = {
      left: rootLeft,
      top: 128,
      width: rootWidth / 2,
      height: 400,
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
    const { classes } = this.props;
    const info = this.props.map.get(Number(this.props.match.params.id));

    return (
      <div className={classes.root} style={this.state.rootRect}>
        <div className={classes.header} style={this.state.headerRect}>
          헤더
        </div>
        <div className={classes.aside} style={this.state.asideRect} >
          <img className={classes.illust} src={info.illust.common} />
        </div>
        <div className={classes.content} style={this.state.contentRect}>
          정보
        </div>
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

export default withStyles(style)(connect(stateMapper, dispatchMapper)(DollDetail));
