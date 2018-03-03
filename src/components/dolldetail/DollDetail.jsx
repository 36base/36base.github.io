import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { Grid, Divider, Typography, Paper } from 'material-ui';
import { setForDollDetail } from '../../actions/doll';

import style from './style';

class DollDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };

    this.props.setForDollDetail(Number(this.props.match.params.id));
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    window.addEventListener('resize', this.updatePosition);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updatePosition);
  }

  updatePosition() {
    const rect = ReactDOM.findDOMNode(this).getBoundingClientRect();

    this.setState({
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: react.height,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography className={classes.header} component="div">
          No.{this.props.id}<span className={classes.headerCaption}>{this.props.krName}</span>
          <Divider className={classes.headerUnderline} />
        </Typography>
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
