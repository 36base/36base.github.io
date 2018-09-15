import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { equips } from 'girlsfrontline-core';
import { injectIntl, FormattedMessage } from 'react-intl';

import Star from '../common/Star';
import ImageBox from '../common/ImageBox';
import HorizonLine from '../common/HorizonLine';
import DollRepository from '../../repositories/DollRepository';
import FairyRepository from '../../repositories/FairyRepository';
import EquipUtil from '../../repositories/data/equip';

const style = theme => ({
  formControl: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
  },
  group: {
    display: 'flex',
    flexDirection: 'row',
    margin: `${theme.spacing.unit}px 0`,
  },
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
  equipImageWrapper: {
    display: 'inline-block',
    position: 'relative',
    width: 64,
    height: 32,
  },
  star: {
    color: '#FFB600',
    fontStyle: 'none',
  },
  name: {
    fontWeight: 'bold',
  },
  general: { color: '#a2a2a2' },
  rare: { color: '#5DD9C3' },
  epochal: { color: '#D6E35A' },
  legendary: { color: '#FDA809' },
  extra: { color: '#D5A3FD' },
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
      selectedType: 'doll',
      map: undefined,
      keys: [],
      renderItem: undefined,
    };

    this.setData = this.setData.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.renderDollItem = this.renderDollItem.bind(this);
    this.renderEquipItem = this.renderEquipItem.bind(this);
    this.renderFairyItem = this.renderFairyItem.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount() {
    this.setData(this.state.selectedType);
  }

  setData(type) {
    if (type === 'doll') {
      DollRepository.fetchAll()
        .then((dolls) => {
          const group = dolls.reduce((map, e) => {
            const { id } = e;
            if (e.buildTime > 0 && id < 20000) {
              if (e.buildTime in map) {
                map[e.buildTime].push(e);
              } else {
                const temp = map;
                temp[e.buildTime] = [e];
                return temp;
              }
            }

            return map;
          }, {});

          this.setState({
            keys: Object.keys(group).map(Number).sort((l, r) => l - r),
            map: new Map(Object.keys(group).map(key => [Number(key), group[key]])),
            renderItem: this.renderDollItem,
          });
        });
    } else if (type === 'equip') {
      const group = equips.reduce((map, e) => {
        const { buildTime } = e;

        if (buildTime && Number.isInteger(buildTime) && buildTime > 0) {
          if (buildTime in map) {
            map[buildTime].push(e);
          } else {
            const temp = map;
            temp[buildTime] = [e];
            return temp;
          }
        }
        return map;
      }, {});

      this.setState({
        keys: Object.keys(group).map(Number).sort((l, r) => l - r),
        map: new Map(Object.keys(group).map(key => [Number(key), group[key]])),
        renderItem: this.renderEquipItem,
      });
    } else if (type === 'fairy') {
      FairyRepository.fetchAll()
        .then((fairies) => {
          const group = fairies.reduce((map, e) => {
            const { buildTime } = e;

            if (buildTime && Number.isInteger(buildTime) && buildTime > 0) {
              if (buildTime in map) {
                map[buildTime].push(e);
              } else {
                const temp = map;
                temp[buildTime] = [e];
                return temp;
              }
            }

            return map;
          }, {});

          this.setState({
            keys: Object.keys(group).map(Number).sort((l, r) => l - r),
            map: new Map(Object.keys(group).map(key => [Number(key), group[key]])),
            renderItem: this.renderFairyItem,
          });
        });
    }
  }

  handleTypeChange(e) {
    this.setState({ selectedType: e.target.value }, () => {
      this.setData(this.state.selectedType);
    });
  }

  renderDollItem(data) {
    const { classes } = this.props;
    return (
      <Link className={classes.link} to={`/doll/${data.id}`}>
        <span className={classes.typeIconWrapper}><ImageBox src={data.icon} /></span>
        <Star className={classes.star} count={data.rank.starCnt} />
        <div className={`${classes.name} ${classes[data.rank.name.toLowerCase()]}`}>
          {data.name}
        </div>
      </Link>
    );
  }

  renderEquipItem(data) {
    const { classes } = this.props;
    return (
      <div>
        <span className={classes.equipImageWrapper}>
          <ImageBox src={EquipUtil.getSpriteUrl(data)} />
        </span>
        <Star className={classes.star} count={data.rank} />
        <div className={`${classes.name} ${classes[EquipUtil.getRankName(data.rank)]}`}>{data.name}</div>
      </div>
    );
  }

  renderFairyItem(data) {
    const { classes } = this.props;
    return (
      <Link className={classes.link} to={`/fairy/${data.id}`}>
        <div className={classes.name}>{data.name}</div>
      </Link>
    );
  }

  renderRow(key) {
    const { classes } = this.props;
    const values = this.state.map.get(key);
    if (!values) {
      return null;
    }

    return [
      <Grid className={classes.timeCell} item xs={3} align="center">
        <Typography variant="display2">{timeToStr(key)}</Typography>
      </Grid>,
      <Grid className={classes.noPadding} item xs={9}>
        {
          values.map(e => this.state.renderItem(e))
            .reduce((acc, e) => (acc ? [...acc, <HorizonLine />, e] : [e]), null)
        }
      </Grid>,
    ];
  }

  render() {
    const { classes, intl } = this.props;
    const rows = this.state.keys
      .map(this.renderRow)
      .reduce((acc, e) => (acc ? [...acc, <HorizonLine />, e] : [e]), null);

    return (
      <div>
        <div>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend"><FormattedMessage id="type" /></FormLabel>
            <RadioGroup
              className={classes.group}
              value={this.state.selectedType}
              onChange={this.handleTypeChange}
            >
              <FormControlLabel value="doll" control={<Radio />} label={intl.formatMessage({ id: 'doll' })} />
              <FormControlLabel value="equip" control={<Radio />} label={intl.formatMessage({ id: 'equip' })} />
              <FormControlLabel value="fairy" control={<Radio />} label={intl.formatMessage({ id: 'fairy' })} />
            </RadioGroup>
          </FormControl>
        </div>
        <Grid className={classes.container} container spacing={8}>
          {rows}
        </Grid>
        <div style={{ height: '100px' }} />
      </div>
    );
  }
}

export default injectIntl(withStyles(style)(TimeTable));
