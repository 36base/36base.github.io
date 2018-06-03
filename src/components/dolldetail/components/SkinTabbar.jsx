import React from 'react';
import { Grid, Button } from 'material-ui';
import { withStyles } from 'material-ui/styles';

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
    const { classes, selected, skins } = this.props;

    return skins.map((v, i) => (
      <Button
        key={v.name}
        className={classes.button}
        variant="raised"
        color={selected === i ? 'primary' : 'default'}
        onClick={() => this.props.onChange(i)}
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

export default withStyles(style)(SkinTabbar);
