import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { Grid, Typography, Paper } from 'material-ui';
import { setForDollDetail } from '../../actions/doll';

import style from './style';

class DollDetail extends React.Component {
  constructor(props) {
    super(props);

    this.props.setForDollDetail(Number(this.props.match.params.id));
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          No.{this.props.id}<span className={classes.caption}>{this.props.krName}</span>
        </div>
        <div className={classes.illust}>일러</div>
        <div className={classes.infobox}>정보</div>
      </div>
    );
  }
}

const stateMapper = state => ({
  map: state.doll.map,
  ...state.doll.selected,
});

const dispatchMapper = dispatch => ({
  setForDollDetail: id => dispatch(setForDollDetail(id)),
});

export default withStyles(style)(connect(stateMapper, dispatchMapper)(DollDetail));
