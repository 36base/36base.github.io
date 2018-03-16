import React from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import { setImgNo, loadSD } from '../../../actions/dolldetail';

const style = theme => ({
  container: {
    display: 'flex',
    zIndex: 200,
  },
  mixin: {
    display: 'inline-block',
    width: '10%',
    height: '100%',
  },
  button: {
    margin: `0 ${theme.spacing.unit / 2}px`,
    marginBottom: theme.spacing.unit,
    padding: `${theme.spacing.unit / 4}px ${theme.spacing.unit / 2}px`,
    minHeight: theme.spacing.unit * 3,
  },
});

class SkinTabbar extends React.Component {
  constructor(props) {
    super(props);

    this.renderButtons = this.renderButtons.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(i) {
    this.props.changeImg(i);
    this.props.changeSd(this.props.dollSpineCode, this.props.values[i].spineCode);
  }

  renderButtons() {
    const { classes, value, values } = this.props;

    return values.map((v, i) => (
      <Button
        key={v.name}
        className={classes.button}
        variant="raised"
        color={value === i ? 'primary' : 'default'}
        onClick={() => this.handleSelect(i)}
      >
        {v.name}
      </Button>
    ));
  }

  render() {
    const { classes } = this.props;
    const buttons = this.renderButtons();

    return (
      <Grid className={classes.container} item xs={10}>
        <span className={classes.mixin} />
        {buttons}
      </Grid>
    );
  }
}

const stateMapper = state => ({
  dollSpineCode: state.dolldetail.mounted.spineCode,
  value: state.dolldetail.imgNo,
  values: state.dolldetail.mounted.images,
});

const dispatchMapper = dispatch => ({
  changeImg: id => dispatch(setImgNo(id)),
  changeSd: (genus, name) => dispatch(loadSD(genus, name)),
});

export default connect(stateMapper, dispatchMapper)(withStyles(style)(SkinTabbar));
