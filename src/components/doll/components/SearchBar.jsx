import React from 'react';
import { connect } from 'react-redux';
import { Grid, Input, Chip, Checkbox } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import { addFilter, deleteFilter } from '../../../actions/dolldict';

const styles = theme => ({
  container: {
    padding: `0 ${theme.spacing.unit * 3}px`,
    display: 'flex',
  },
  checkbox: {
    display: 'inline-block',
  },
  chip: {
    marginLeft: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2,
    marginBottom: theme.spacing.unit / 4,
  },
  input: {
    alignSelf: 'flex-end',
  },
});

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: '' };

    this.onRankCheckboxChange = this.onRankCheckboxChange.bind(this);
    this.onTypeCheckboxChange = this.onTypeCheckboxChange.bind(this);
    this.onTextInputChangeValue = this.onTextInputChangeValue.bind(this);
    this.onTextInputKeyDown = this.onTextInputKeyDown.bind(this);
  }

  onRankCheckboxChange(e) {
    if (e.target.checked) {
      this.props.addFilter({ value: e.target.id, type: 'rank' });
    } else {
      this.props.deleteFilter(this.props.filters.find(item => item.type === 'rank' && item.query === e.target.id));
    }
  }
  onTypeCheckboxChange(e) {
    if (e.target.checked) {
      this.props.addFilter({ value: e.target.id, type: 'type' });
    } else {
      this.props.deleteFilter(this.props.filters.find(item => item.type === 'type' && item.query === e.target.id));
    }
  }

  onTextInputKeyDown(e) {
    const { value } = this.state;
    const { filters } = this.props;
    if (e.keyCode === 13) {
      this.props.addFilter({ value: this.state.value, type: 'name' });
      this.setState({ value: '' });
    } else if (e.keyCode === 8 && value.length === 0 && filters.length > 0) {
      const nameFilters = filters.map(item => (item.type === 'name' ? item : null));
      this.props.deleteFilter(nameFilters[nameFilters.length - 1]);
    }
  }

  onTextInputChangeValue(e) {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    const { classes, filters } = this.props;
    const { value } = this.state;
    const isEmpty = value.length === 0 && filters.length === 0;

    const chips = filters.map((item) => {
      if (item.type !== 'name') return '';
      return (
        <Chip
          className={classes.chip}
          key={item.query}
          tabIndex={-1}
          label={item.query}
          onDelete={() => this.props.deleteFilter(item)}
        />
      );
    });

    return (
      <Grid container>
        <Grid item xs={12} md={4} container>
          <Grid item xs={12} md={12}>
            <div className={classes.checkbox}><Checkbox id="2성" onChange={this.onRankCheckboxChange} />2성</div>
            <div className={classes.checkbox}><Checkbox id="3성" onChange={this.onRankCheckboxChange} />3성</div>
            <div className={classes.checkbox}><Checkbox id="4성" onChange={this.onRankCheckboxChange} />4성</div>
            <div className={classes.checkbox}><Checkbox id="5성" onChange={this.onRankCheckboxChange} />5성</div>
            <div className={classes.checkbox}>
              <Checkbox id="엑스트라" onChange={this.onRankCheckboxChange} />Extra
            </div>
          </Grid>
          <Grid item xs={12} md={12}>
            <div className={classes.checkbox}><Checkbox id="HG" onChange={this.onTypeCheckboxChange} />HG</div>
            <div className={classes.checkbox}><Checkbox id="SMG" onChange={this.onTypeCheckboxChange} />SMG</div>
            <div className={classes.checkbox}><Checkbox id="AR" onChange={this.onTypeCheckboxChange} />AR</div>
            <div className={classes.checkbox}><Checkbox id="RF" onChange={this.onTypeCheckboxChange} />RF</div>
            <div className={classes.checkbox}><Checkbox id="MG" onChange={this.onTypeCheckboxChange} />MG</div>
            <div className={classes.checkbox}><Checkbox id="SG" onChange={this.onTypeCheckboxChange} />SG</div>
          </Grid>
        </Grid>
        <Grid className={classes.container} item xs={12} md={6}>
          <Input
            id="doll-dict-search"
            type="search"
            fullWidth
            placeholder={isEmpty ? '이름, 별명' : ''}
            className={classes.input}
            value={this.state.value}
            onChange={this.onTextInputChangeValue}
            onKeyDown={this.onTextInputKeyDown}
            startAdornment={chips}
          />
        </Grid>
      </Grid>
    );
  }
}

const stateMapper = state => ({
  filters: state.dolldict.filters,
});

const dispatchMapper = dispatch => ({
  addFilter: filter => dispatch(addFilter(filter)),
  deleteFilter: filter => dispatch(deleteFilter(filter)),
});

export default connect(stateMapper, dispatchMapper)(withStyles(styles)(SearchBar));
