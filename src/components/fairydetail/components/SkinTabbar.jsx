import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const style = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    zIndex: 200,
  },
  mixin: {
    display: 'inline-block',
    [theme.breakpoints.up('md')]: {
      width: '10%',
      height: '100%',
    },
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
  }

  renderButtons() {
    const { classes, selected } = this.props;

    const buttons = [];
    for (let i = 1; i <= 3;) {
      // eslint-disable-next-line
      buttons.push(
        <Button
          key={i}
          className={classes.button}
          variant="raised"
          color={selected === i ? 'primary' : 'default'}
          onClick={() => this.props.onChange(i)}
        >
          Mod {i}
        </Button>);
      i += 1;
    }
    return buttons;
  }

  render() {
    const { classes } = this.props;
    const button = this.renderButtons();

    return (
      <Grid className={classes.container} item xs={10}>
        <span className={classes.mixin} />
        {button}
      </Grid>
    );
  }
}

export default withStyles(style)(SkinTabbar);
