import React from 'react';
import { withStyles } from 'material-ui/styles';
import { injectIntl } from 'react-intl';

const style = theme => ({
  container: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: '90%',
      margin: '0 auto',
    },
    [theme.breakpoints.up('md')]: {
      border: `1px solid ${theme.palette.primary.dark}`,
      width: '100%',
      maxWidth: 512,
      marginLeft: theme.spacing.unit * 10,
      marginTop: theme.spacing.unit * 5,
    },
  },
});

class Story extends React.Component {
  render() {
    const { classes } = this.props;

    const list = [
      { title: '준비운동', id: '0-1' },
    ];

    return (
      <div>
        <div className={classes.container}>
          {list.map(item => (<div><h1>{item.title}</h1></div>))}
        </div>
      </div>
    );
  }
}

export default injectIntl(withStyles(style)(Story));
