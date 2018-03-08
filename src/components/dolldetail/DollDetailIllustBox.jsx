import React from 'react';
import { Button } from 'material-ui';
import { Sync } from 'material-ui-icons';
import { withStyles } from 'material-ui/styles';

const style = {
  wrapper: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  buttons: {
    paddingLeft: '15%',
  },
  button: {
    margin: '0 5px',
    padding: '3px 5px',
    minHeight: '24px',
  },
  image: {
    flexGrow: 1,
    zIndex: 20,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
};

function makeValues(info) {
  const basic = {
    name: '기본',
    common: info.illust.common,
    damaged: info.illust.damaged,
  };

  return [basic, ...info.skinList.map(skin => ({
    name: skin.name,
    common: skin.illust.common,
    damaged: skin.illust.damaged,
  }))];
}

class DollDetailIllustBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: makeValues(props.info),
      value: 0,
      type: 'common',
    };

    this.toggleType = this.toggleType.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  getImage() {
    const { values, value, type } = this.state;
    const url = values[value][type];

    return {
      backgroundImage: `url(${url})`,
    };
  }

  toggleType() {
    const { type } = this.state;
    this.setState({
      type: type === 'common' ? 'damaged' : 'common',
    });
  }

  handleSelect(value) {
    this.setState({
      value,
    });
  }

  render() {
    const { classes } = this.props;
    const { values, value } = this.state;

    return (
      <div className={classes.wrapper}>
        <div className={classes.buttons}>
          {values.map((v, i) => (
            <Button className={classes.button} variant="raised" color={i === value ? 'primary' : 'grey'} onClick={() => this.handleSelect(i)}>{v.name}</Button>
          ))}
        </div>
        <div className={classes.image} style={this.getImage()} />
      </div>
    );
  }
}

export default withStyles(style)(DollDetailIllustBox);
