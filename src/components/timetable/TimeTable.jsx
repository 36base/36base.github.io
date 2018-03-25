import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import Star from '../common/Star';
import ImageBox from '../common/ImageBox';
import HorizonLine from '../common/HorizonLine';
import DollRepository from '../../repositories/DollRepository';

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
  timeCell: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRight: '1px solid black',
  },
  noPadding: {
    padding: 0,
  },
  link: {
    display: 'block',
    color: 'inherit',
    fontSize: 16,
    textDecoration: 'none',
    padding: '4px 0 2px 8px',
  },
  typeIconWrapper: {
    display: 'inline-block',
    position: 'relative',
    background: 'linear-gradient(140deg, black 90%, transparent 90%)',
    width: 64,
    height: 32,
  },
  typeIcon: {
    width: theme.spacing.unit * 8,
  },
  star: {
    color: '#FFB600',
    fontStyle: 'none',
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
    const { classes } = this.props;
    const values = this.state.map.get(key);
    if (!values) {
      return null;
    }

    return [
      <Grid className={classes.timeCell} item xs={2} align="center">
        <Typography variant="display2">{timeToStr(key)}</Typography>
      </Grid>,
      <Grid className={classes.noPadding} item xs={10}>
        {
          values.map(e => (
            <Link className={classes.link} to={`/doll/${e.id}`}>
              <span className={classes.typeIconWrapper}><ImageBox src={e.icon} /></span>
              <Star className={classes.star} count={e.rank.starCnt} />
              {e.krName}
            </Link>
          )).reduce((acc, e) => (acc ? [...acc, <HorizonLine />, e] : [e]), null)
        }
      </Grid>,
    ];
  }

  render() {
    const { classes } = this.props;
    const rows = this.state.keys
      .map(this.renderRow)
      .reduce((acc, e) => (acc ? [...acc, <HorizonLine />, e] : [e]), null);

    return (
      <Grid className={classes.container} container spacing={8}>
        {rows}
      </Grid>
    );
  }
}

export default withStyles(style)(TimeTable);
