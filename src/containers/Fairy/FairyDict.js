import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ViewTypePanel from '../../components/ViewTypePanel';
import FairyTable from './FairyTable';
import FairyGrid from './FairyGrid';

import * as dictActions from '../../store/modules/fairyDict';

const styles = () => ({
  grid: {
    width: '100%',
    paddingLeft: 8,
    paddingRight: 8,
  },
});

class FairyDict extends Component {
  handleChangeViewType = (event, viewType) => {
    const { changeView } = this.props;

    changeView(viewType);
  }

  render() {
    const { classes, viewType, fairies } = this.props;
    return (
      <div>
        <ViewTypePanel viewType={viewType} onChangeView={this.handleChangeViewType} />
        {viewType === 'headline' && <FairyTable fairies={fairies} />}
        {viewType === 'module' && <FairyGrid className={classes.grid} fairies={fairies} />}
      </div>
    );
  }
}
FairyDict.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  changeView: PropTypes.func.isRequired,
  viewType: PropTypes.string.isRequired,
  fairies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => {
  const { fairies, viewType } = state.fairyDict;
  return {
    fairies,
    viewType,
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(dictActions, dispatch),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(FairyDict);
