import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import { headRows } from './tableData';
import { stableSort, getSorting } from '../../../utils/sort';
import * as tableActions from '../../../store/modules/fairyTable';

const styles = () => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  name: {
    padding: '4px 24px 4px 24px',
    minWidth: 64,
  },
  cell: {
    padding: '4px 24px 4px 16px',
  },
});

class FairyTable extends Component {
  handleClickSortLabel = row => () => {
    const { id, sortable } = row;
    const { sort } = this.props;

    if (sortable) {
      sort(id);
    }
  }

  render() {
    const {
      className, classes, t, orderBy, order, onClick, fairies,
    } = this.props;

    return (
      <Paper className={classnames(className, classes.root)}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {headRows.map((row) => {
                const { id, numeric, label } = row;
                return (
                  <TableCell
                    key={id}
                    className={id === 'name' ? classes.name : classes.cell}
                    numeric={numeric}
                    sortDirection={orderBy === id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === id}
                      direction={order}
                      onClick={this.handleClickSortLabel(row)}
                    >
                      {label}
                    </TableSortLabel>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(fairies, getSorting(order, orderBy)).map((fairy) => {
              const { id } = fairy;
              return (
                <TableRow
                  key={id}
                  hover
                  onClick={onClick(fairy)}
                >
                  {headRows.map(({
                    id: headId, numeric, render,
                  }) => (
                    <TableCell
                      key={headId}
                      className={headId === 'name' ? classes.name : classes.cell}
                      numeric={numeric}
                    >
                      {render(t, fairy[headId])}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
FairyTable.defaultProps = {
  className: '',
  onClick: () => null,
};
FairyTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  fairies: PropTypes.arrayOf(PropTypes.object).isRequired,
  t: PropTypes.func.isRequired,
  orderBy: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  sort: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const {
    orderBy, order,
  } = state.fairyTable;
  return {
    orderBy,
    order,
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(tableActions, dispatch),
});

export default compose(
  translate(),
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(FairyTable);
