import React from 'react';
import { withStyles } from 'material-ui/styles';

import style from './resources/style';
import working01 from './resources/working1.png';
// import working02 from './resources/working2.png';

class CheckList extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <img className={classes.working} alt="working - checklist" src={working01} />
      </div>
    );
  }
}

export default withStyles(style)(CheckList);
