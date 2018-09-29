import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { translate } from 'react-i18next';
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
  handleSort = row => () => {
    const { id: orderBy, sortable } = row;
    const { onSort } = this.props;

    if (sortable) {
      onSort(orderBy);
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
                      onClick={this.handleSort(row)}
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
  orderBy: '',
  order: '',
};
FairyTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  fairies: PropTypes.arrayOf(PropTypes.object).isRequired,
  t: PropTypes.func.isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.string,
  onClick: PropTypes.func,
  onSort: PropTypes.func.isRequired,
};

export default compose(
  translate(),
  withStyles(styles),
)(FairyTable);
