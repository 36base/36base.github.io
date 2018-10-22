import React from 'react';
import {
  Grid, Input, Chip, Checkbox,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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

    this.state = { };
  }

  componentWillMount() {
    this.load(this.props);
  }

  onCheckboxChange = type => (event) => {
    const { data } = this.props;
    const { [type]: { action: { add, remove } } } = data;
    const { [type]: { filters } } = this.state;
    const { checked, value } = event.target;

    if (checked) {
      this.setState(prevState => ({
        ...prevState,
        [type]: { ...(prevState[type]), filters: [...filters, value] },
      }), () => {
        add(value);
      });
    } else {
      this.setState(prevState => ({
        ...prevState,
        [type]: { ...(prevState[type]), filters: filters.filter(e => (e !== value)) },
      }), () => {
        remove(value);
      });
    }
  }

  onTextInputKeyDown = type => (event) => {
    const { data } = this.props;
    const { [type]: { action: { add, remove } } } = data;
    const { value } = event.target;
    const { [type]: { filters } } = this.state;

    if (event.keyCode === 13) { // Enter
      this.setState(prevState => ({
        ...prevState,
        [type]: {
          ...(prevState[type]),
          value: '',
          filters: [...filters, value],
        },
      }), () => {
        add(value);
      });
    } else if (
      event.keyCode === 8
      && value.length === 0
      && filters.length > 0
    ) { // Remove with BackSpace
      const target = filters[filters.length - 1];

      this.setState(prevState => ({
        ...prevState,
        [type]: {
          ...(prevState[type]),
          value: '',
          filters: filters.slice(0, filters.length - 1),
        },
      }), () => {
        remove(target);
      });
    }
  }

  onTextInputChangeValue = type => (event) => {
    const { value } = event.target;
    this.setState(prevState => ({
      ...prevState,
      [type]: {
        ...(prevState[type]),
        value,
      },
    }));
  }

  onDeleteChip = (type, item) => {
    const { data } = this.props;
    const { [type]: { action: { remove } } } = data;
    const { [type]: { filters } } = this.state;

    this.setState(prevState => ({
      ...prevState,
      [type]: {
        ...(prevState[type]),
        filters: filters.filter(e => e !== item),
      },
    }), () => {
      remove(item);
    });
  }

  load = (props) => {
    const { data } = props;

    const state = { };
    Object.keys(data).forEach((e) => {
      state[e] = { filters: [] };

      if (data[e].type === 'input') {
        state[e].value = '';
      }
    });

    this.setState(state);
  }

  render() {
    const { state } = this;
    const {
      classes,
      data,
    } = this.props;
    const keys = Object.keys(state);

    const renderChips = (type, inputFilters) => inputFilters.map(item => (
      <Chip
        className={classes.chip}
        key={item}
        tabIndex={-1}
        label={item}
        onDelete={() => this.onDeleteChip(type, item)}
      />
    ));

    const renderCheckboxes = (key, propData, stateData) => propData.data.map(e => (
      <div className={classes.checkbox}>
        <Checkbox
          id={e.value}
          value={e.value}
          checked={stateData.filters.includes(e.value)}
          onChange={this.onCheckboxChange(key)}
        />
        {e.label}
      </div>
    ));

    const renderInput = (key, propData, stateData) => (
      <Input
        id="doll-dict-search"
        type="search"
        fullWidth
        placeholder={
          (
            (stateData.value.length === 0)
            && (stateData.filters.length) === 0
          ) ? propData.label : ''}
        className={classes.input}
        value={stateData.value}
        onChange={this.onTextInputChangeValue(key)}
        onKeyDown={this.onTextInputKeyDown(key)}
        startAdornment={renderChips(key, stateData.filters)}
      />
    );

    return (
      <Grid container>
        <Grid item xs={12} md={12} container>
          {keys.map((key) => {
            switch (data[key].type) {
              case 'checkbox':
                return (
                  <Grid item xs={12} md={12}>
                    {renderCheckboxes(key, data[key], state[key])}
                  </Grid>
                );
              case 'input': {
                return (
                  <Grid className={classes.container} item xs={12} md={6}>
                    {renderInput(key, data[key], state[key])}
                  </Grid>
                );
              }
              default: break;
            }
            return (<div />);
          })}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SearchBar);
