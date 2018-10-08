import React from 'react';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

const style = theme => ({
  container: {
    width: '100%',
    height: '100%',
  },
});

class Page404 extends React.Component {
  render() {
    const { classes, t } = this.props;
    return (
      <div className={classes.container}>
        <h1>404 Not Found</h1>
      </div>
    );
  }
}

export default compose(
  translate(),
  withStyles(style),
)(Page404);
