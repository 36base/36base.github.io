import React from 'react';
import { Grid, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { injectIntl, FormattedMessage } from 'react-intl';

import InfoBox from '../../common/InfoBox';
import HorizonLine from '../../common/HorizonLine';
import SmallSelector from '../../common/SmallSelector';

const style = theme => ({
  container: {
    paddingTop: theme.spacing.unit * 0.75,
    paddingBottom: theme.spacing.unit * 0.75,
    paddingLeft: theme.spacing.unit * 2,
  },
  statusBar: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    border: '1px solid grey',
  },
  selectors: {
    display: 'flex',
  },
  selectorLabel: {
    fontSize: '0.8em',
    color: 'black',
  },
  selector: {
    color: 'black',
  },
});

const fullLvValues = Array(120).fill().map((_, i) => ({ value: i + 1, name: i + 1 }));
const fullFavorValues = Array(200).fill().map((_, i) => ({ value: i + 1, name: i + 1 }));

let lvValues = fullLvValues;
let favorValues = fullFavorValues;

class StatusInfoBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lv: 100,
      favor: 100,
    };

    this.handleLvChange = this.handleLvChange.bind(this);
    this.handleFavorChange = this.handleFavorChange.bind(this);
  }
  componentWillMount() {
    const { id } = this.props;

    if (id < 20000) {
      lvValues = fullLvValues.splice(0, 100);
      favorValues = fullFavorValues.splice(0, 150);
    } else {
      lvValues = fullLvValues;
      favorValues = fullFavorValues;
    }
  }
  handleLvChange(event) {
    this.setState({ lv: event.target.value }, () => {
      this.forceUpdate();
    });
  }
  handleFavorChange(event) {
    this.setState({ favor: event.target.value }, () => {
      this.forceUpdate();
    });
  }
  render() {
    const { lv, favor } = this.state;

    const stats = this.props.getStats({ level: lv, favor });

    const buildRow = (label, value, maxValue, color) => {
      const statusRate = Math.min(1, value / maxValue) * 100;
      const statusBackground = {
        background: `linear-gradient(to right, ${color} ${statusRate}%, transparent ${statusRate}%)`,
      };

      return [
        <Grid key="row" className={this.props.classes.container} container spacing={8}>
          <Grid item xs><Typography>{label}</Typography></Grid>
          <Grid item xs><Typography>{value}</Typography></Grid>
          <Grid item xs={8}>
            <div className={this.props.classes.statusBar} style={statusBackground} />
          </Grid>
        </Grid>,
        <HorizonLine key="hr" />,
      ];
    };
    // TODO: Rate of Fire에서 글자수 때문에 그래프스타일이 깨지는 문제발생 (2018-0729)
    const selectors = (
      <div className={this.props.classes.selectors}>
        <div className={this.props.classes.selectorLabel}><FormattedMessage id="Level" /></div>
        <SmallSelector
          values={lvValues}
          selected={this.state.lv}
          onChange={this.handleLvChange}
        />
        <div className={this.props.classes.selectorLabel}><FormattedMessage id="Favor" /></div>
        <SmallSelector
          values={favorValues}
          selected={this.state.favor}
          onChange={this.handleFavorChange}
        />
      </div>
    );
    return (
      <InfoBox name={this.props.intl.formatMessage({ id: 'Status' })} selector={selectors}>
        {buildRow(this.props.intl.formatMessage({ id: 'Health' }), stats.hp, 300, 'red')}
        {buildRow(this.props.intl.formatMessage({ id: 'Damage' }), stats.pow, 200, 'brown')}
        {buildRow(this.props.intl.formatMessage({ id: 'Accuracy' }), stats.hit, 100, 'yellow')}
        {buildRow(this.props.intl.formatMessage({ id: 'Evasion' }), stats.dodge, 150, 'green')}
        {buildRow(this.props.intl.formatMessage({ id: 'Rate of Fire' }), stats.rate, 120, 'orange')}
      </InfoBox>
    );
  }
}

export default injectIntl(withStyles(style)(StatusInfoBox));
