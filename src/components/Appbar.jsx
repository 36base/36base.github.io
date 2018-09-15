import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography } from 'material-ui';
import MenuIcon from 'material-ui-icons/Menu';
import { withStyles } from 'material-ui/styles';
import { FormattedMessage, injectIntl } from 'react-intl';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { i18next } from 'girlsfrontline-core';

import SmallSelector from './common/SmallSelector';
import { toggleMobile } from '../actions/menu';

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
    value: 'ko',
    name: '한국어',
  },
  {
    value: 'en',
    name: 'English',
  },
  {
    value: 'ja',
    name: '日本語',
  },
];

class Appbar extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);

    const { cookies } = props;

    const langState = cookies.get('lang');

    if (!(langState === undefined)) {
      this.state = {
        languageName: langState,
      };
    } else {
      this.state = {
        languageName: 'ko',
      };
    }


    this.setLanguage = this.setLanguage.bind(this);
  }

  componentDidMount() {
    const { intl } = this.props;
    document.title = intl.formatMessage({ id: '36Base - Girl\'s Frontline Database' });
  }

  setLanguage(event) {
    const { cookies } = this.props;
    cookies.set('lang', event.target.value, { path: '/' });
    this.setState({ languageName: event.target.value });
    window.location.reload();

    switch (event.target.value) {
      case 'ko':
        i18next.changeLanguage('ko-KR');
        break;
      case 'en':
        i18next.changeLanguage('en-US');
        break;
      case 'ja':
        i18next.changeLanguage('ja-JP');
        break;
      default:
        i18next.changeLanguage('ko-KR');
        break;
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.props.toggleMobile}
            className={classes.navIconHide}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex} noWrap>
            <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/"><FormattedMessage id="36base" /></Link>
          </Typography>
          <SmallSelector
            label="Language"
            values={language}
            selected={this.state.languageName}
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

// eslint-disable-next-line
export default connect(stateMapper, dispatchMapper)(withStyles(style)(withCookies(injectIntl(Appbar))));
