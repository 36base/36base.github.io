import React from 'react';
import { connect } from 'react-redux';
import { Grid, Input, Chip, Checkbox } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage, injectIntl } from 'react-intl';

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
      this.props.addFilter({ value: value.toLowerCase(), type: 'name' });
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
    const { classes, filters, intl } = this.props;
    const { value } = this.state;
    const isEmpty = value.length === 0 && filters.length === 0;

    const chips = filters.filter(item => item.type === 'name').map(item => (
      <Chip
        className={classes.chip}
        key={item.query}
        tabIndex={-1}
        label={item.query}
        onDelete={() => this.props.deleteFilter(item)}
      />
    ));

    const checks = filters.filter(item => item.type !== 'name');
    const checkVal = { };
    for (let i = 0; i < checks.length; i += 1) checkVal[checks[i].query] = true;

    return (
      <Grid container>
        <Grid item xs={12} md={4} container>
          <Grid item xs={12} md={12}>
            <div className={classes.checkbox}><Checkbox id="2성" onChange={this.onRankCheckboxChange} checked={checkVal['2성'] ? 1 : 0} /><FormattedMessage id="2-Star" /></div>
            <div className={classes.checkbox}><Checkbox id="3성" onChange={this.onRankCheckboxChange} checked={checkVal['3성'] ? 1 : 0} /><FormattedMessage id="3-Star" /></div>
            <div className={classes.checkbox}><Checkbox id="4성" onChange={this.onRankCheckboxChange} checked={checkVal['4성'] ? 1 : 0} /><FormattedMessage id="4-Star" /></div>
            <div className={classes.checkbox}><Checkbox id="5성" onChange={this.onRankCheckboxChange} checked={checkVal['5성'] ? 1 : 0} /><FormattedMessage id="5-Star" /></div>
            <div className={classes.checkbox}>
              <Checkbox id="엑스트라" onChange={this.onRankCheckboxChange} checked={checkVal['엑스트라'] ? 1 : 0} />Extra
            </div>
          </Grid>
          <Grid item xs={12} md={12}>
            <div className={classes.checkbox}><Checkbox id="HG" onChange={this.onTypeCheckboxChange} checked={checkVal.HG ? 1 : 0} />HG</div>
            <div className={classes.checkbox}><Checkbox id="SMG" onChange={this.onTypeCheckboxChange} checked={checkVal.SMG ? 1 : 0} />SMG</div>
            <div className={classes.checkbox}><Checkbox id="AR" onChange={this.onTypeCheckboxChange} checked={checkVal.AR ? 1 : 0} />AR</div>
            <div className={classes.checkbox}><Checkbox id="RF" onChange={this.onTypeCheckboxChange} checked={checkVal.RF ? 1 : 0} />RF</div>
            <div className={classes.checkbox}><Checkbox id="MG" onChange={this.onTypeCheckboxChange} checked={checkVal.MG ? 1 : 0} />MG</div>
            <div className={classes.checkbox}><Checkbox id="SG" onChange={this.onTypeCheckboxChange} checked={checkVal.SG ? 1 : 0} />SG</div>
          </Grid>
        </Grid>
        <Grid className={classes.container} item xs={12} md={6}>
          <Input
            id="doll-dict-search"
            type="search"
            fullWidth
            placeholder={isEmpty ? intl.formatMessage({ id: 'Name' }) : ''}
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

export default connect(stateMapper, dispatchMapper)(injectIntl(withStyles(styles)(SearchBar)));
