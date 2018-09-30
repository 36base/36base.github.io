import React from 'react';
import PropTypes from 'prop-types';
import { I18nextProvider } from 'react-i18next';
import { Provider as ReduxProvider } from 'react-redux';
import i18n from '../src/i18n';
import store from '../src/store';

function Provider({ story }) {
  return (
    <I18nextProvider i18n={i18n}>
      <ReduxProvider store={store}>
        {story}
      </ReduxProvider>
    </I18nextProvider>
  );
}
Provider.propTypes = {
  story: PropTypes.node.isRequired,
};

export default Provider;
