import React from 'react';
import { connect } from 'react-redux';
import { Grid, Input, Chip } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import { addFilter, deleteFilter } from '../../../actions/dolldict';

const styles = theme => ({
  container: {
    padding: `0 ${theme.spacing.unit * 3}px`,
  },
  chip: {
    marginLeft: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2,
    marginBottom: theme.spacing.unit / 4,
  },
});

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: '' };

    this.onChangeValue = this.onChangeValue.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(e) {
    const { value } = this.state;
    const { filters } = this.props;
    if (e.keyCode === 13) {
      this.props.addFilter(value);
      this.setState({ value: '' });
    } else if (e.keyCode === 8 && value.length === 0 && filters.length > 0) {
      this.props.deleteFilter(filters[filters.length - 1]);
    }
  }

  onChangeValue(e) {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    const { classes, filters } = this.props;
    const { value } = this.state;
    const isEmpty = value.length === 0 && filters.length === 0;

    const chips = filters.map(item => (
      <Chip
        className={classes.chip}
        key={item.query}
        tabIndex={-1}
        label={item.query}
        onDelete={() => this.props.deleteFilter(item)}
      />
    ));

    return (
      <Grid className={classes.container} item xs={10}>
        <Input
          id="doll-dict-search"
          type="search"
          fullWidth
          placeholder={isEmpty ? '검색하세요!' : ''}
          value={this.state.value}
          onChange={this.onChangeValue}
          onKeyDown={this.onKeyDown}
          startAdornment={chips}
        />
      </Grid>
    );
  }
}

const stateMapper = state => ({
  filters: state.dolldict.filters,
});

const dispatchMapper = dispatch => ({
  addFilter: value => dispatch(addFilter(value)),
  deleteFilter: filter => dispatch(deleteFilter(filter)),
});

export default connect(stateMapper, dispatchMapper)(withStyles(styles)(SearchBar));
