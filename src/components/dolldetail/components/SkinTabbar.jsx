import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const style = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    zIndex: 210,
    [theme.breakpoints.up('md')]: {
      maxWidth: '70vh',
      paddingLeft: '100px',
    },
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
    zIndex: 210,
  },
});

class SkinTabbar extends React.Component {
  renderButtons = () => {
    const {
      classes,
      selected,
      skins,
      onChange,
    } = this.props;

    return skins.map(skin => (
      <Button
        key={skin.id}
        className={classes.button}
        variant="raised"
        color={selected === skin.id ? 'primary' : 'default'}
        onClick={() => onChange(skin.id)}
      >
        {skin.name}
      </Button>
    ));
  }

  render() {
    const { classes } = this.props;
    const buttons = this.renderButtons();

    return (
      <Grid className={classes.container} item xs={10}>
        {buttons}
      </Grid>
    );
  }
}

export default withStyles(style)(SkinTabbar);
