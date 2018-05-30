import React from 'react';
import { withStyles } from 'material-ui/styles';

import style from './resources/style';

class CheckList extends React.Component{
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        hello
      </div>
    );
  }
}

export default withStyles(style)(CheckList);


