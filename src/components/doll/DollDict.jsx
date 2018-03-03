import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

import DollCard from './card/DollCard';

const style = {
  wrapper: {
    maxWidth: 1074,
    minWidth: 644.4,
    margin: '0 auto',
  },
};

class DollDict extends React.Component {
  render() {
    const { dolls, classes } = this.props;

    return (
      <div className={classes.wrapper}>
        {dolls.map(doll => <DollCard {...doll} />)}
      </div>
    );
  }
}

const stateMapper = state => ({
  dolls: state.doll.list,
});

export default withStyles(style)(connect(stateMapper)(DollDict));
