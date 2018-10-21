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
  handleOnClick = (fairyId) => {
    const { history } = this.props;
    history.push(`/fairy/${fairyId}`);
  }

  handleChangeViewType = (event, viewType) => {
    const { changeView } = this.props;

    changeView(viewType);
  }

  handleSortTable = (orderBy) => {
    const { sort } = this.props;

    sort(orderBy);
  }

  render() {
    const {
      classes, viewType, fairies, fairyTable,
    } = this.props;
    return (
      <div>
        <ViewTypePanel viewType={viewType} onChangeView={this.handleChangeViewType} />
        {viewType === 'headline' && (
          <FairyTable
            fairies={fairies}
            orderBy={fairyTable.orderBy}
            order={fairyTable.order}
            handleSortTable={this.handleSortTable}
            onClick={fairyId => this.handleOnClick(fairyId)}
          />
        )}
        {viewType === 'module' && (
          <FairyGrid
            className={classes.grid}
            fairies={fairies}
            onClick={fairyId => this.handleOnClick(fairyId)}
          />
        )}
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
  fairyTable: PropTypes.shape({
    orderBy: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
  }).isRequired,
  sort: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { fairies, viewType, fairyTable } = state.fairyDict;

  return {
    fairies: Object.keys(fairies).map(e => fairies[e]),
    viewType,
    fairyTable,
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(dictActions, dispatch),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(FairyDict);
