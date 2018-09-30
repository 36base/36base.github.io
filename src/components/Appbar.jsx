import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import {
  AppBar, Toolbar, IconButton, Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';

import SmallSelector from './common/SmallSelector';
import { toggleMobile } from '../store/modules/menu';

const style = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  navIconHide: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  flex: {
    flexGrow: 1,
  },
});

const language = [
  {
    value: 'ko-KR',
    name: '한국어',
  },
  {
    value: 'en-US',
    name: 'English',
  },
  {
    value: 'ja-JP',
    name: '日本語',
  },
  {
    value: 'zh-CN',
    name: '中文',
  },
];

class Appbar extends React.Component {
  componentDidMount() {
    const { t } = this.props;
    document.title = t('36Base - Girl\'s Frontline Database');
  }

  setLanguage = (event) => {
    const { i18n } = this.props;
    i18n.changeLanguage(event.target.value);
  }

  render() {
    const {
      classes, t, i18n, toggleMobile: propToggleMobile,
    } = this.props;

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={propToggleMobile}
            className={classes.navIconHide}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex} noWrap>
            <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/">{t('36base')}</Link>
          </Typography>
          <SmallSelector
            label="Language"
            values={language}
            selected={i18n.language}
            onChange={this.setLanguage}
          />
        </Toolbar>
      </AppBar>
    );
  }
}

const stateMapper = undefined;
const dispatchMapper = dispatch => ({
  toggleMobile: () => dispatch(toggleMobile()),
});

export default compose(
  connect(stateMapper, dispatchMapper),
  withStyles(style),
  translate(),
)(Appbar);
