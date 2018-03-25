import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import DollRepository from '../../repositories/DollRepository';

const style = theme => ({
  container: {
    width: '100%',
    maxWidth: 512,
  },
});

function timeToStr(time) {
  if (time === undefined || time === 0) {
    return '불가';
  }

  const hour = Math.floor(time / 3600);
  const min = (time / 60) % 60;
  return `${hour < 10 ? '0' : ''}${hour} : ${min < 10 ? '0' : ''}${min}`;
}

class TimeTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      map: undefined,
      keys: [],
    };

    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount() {
    DollRepository.fetchAll()
      .then((dolls) => {
        const group = dolls.reduce((map, e) => {
          const { build } = e.acquisition;
          if (Number.isInteger(build) && build > 0) {
            if (build in map) {
              map[build].push(e);
            } else {
              map[build] = [e];
            }
          }

          return map;
        }, {});

        this.setState({
          keys: Object.keys(group).map(Number).sort((l, r) => l - r),
          map: new Map(Object.keys(group).map(key => [Number(key), group[key]])),
        });
      });
  }

  renderRow(key) {
    const values = this.state.map.get(key);
    if (!values) {
      return null;
    }

    return [
      <Grid item xs={2} align="center">
        <Typography>{timeToStr(key)}</Typography>
      </Grid>,
      <Grid item xs={10}>
        {
          values.map(e => <Link to={`/doll/${e.id}`}><Typography>{e.krName}</Typography></Link>)
        }
      </Grid>,
    ];
  }

  render() {
    const { classes } = this.props;
    const rows = this.state.keys.map(this.renderRow);

    return (
      <Grid className={classes.container} container spacing={8}>
        {rows}
      </Grid>
    );
  }
}

export default withStyles(style)(TimeTable);
