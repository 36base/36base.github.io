import React from 'react';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

const style = theme => ({
  container: {
    width: '100%',
    height: '100%',
  },
  frame: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
      width: '100%',
      height: '100%',
      margin: 0,
      padding: 0,
      top: 0,
      left: 0,
      border: 'none',
    },
  },
  errorBox: {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

// eslint-disable-next-line react/prefer-stateless-function
class SdSimulator extends React.Component {
  render() {
    const { classes, t } = this.props;
    return (
      <div className={classes.container}>
        <iframe title="SD 시뮬레이터" src="https://girlsfrontline.kr/db/simulator/" className={classes.frame} />
        <div className={classes.errorBox}>
          <h2>
            {t('in mobile please follow the link below')}
          </h2>
          <a href="https://girlsfrontline.kr/db/simulator/">
            {t('SD simulator link')}
          </a>
        </div>
      </div>
    );
  }
}

export default compose(
  translate(),
  withStyles(style),
)(SdSimulator);
