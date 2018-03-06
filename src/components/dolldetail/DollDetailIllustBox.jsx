import React from 'react';
import { Button } from 'material-ui';
import { Sync } from 'material-ui-icons';
import { withStyles } from 'material-ui/styles';

import './illustBox.css';

const style = {
  wrapper: {
    display: 'flex',
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
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
  toggleButton: {
    float: 'right',
    marginRight: '20%',
    fontSize: 36,
    backgroundColor: '#E10050',
    color: 'white',
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
    return values[value][type];
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
    const {
      classes,
      pos,
    } = this.props;
    const { values, value } = this.state;

    return (
      <div className={classes.wrapper} style={pos}>
        <div className={classes.buttons}>
          {values.map((v, i) => (
            <Button
              className={classes.button}
              variant="raised"
              color={i === value ? 'primary' : 'grey'}
              onClick={() => this.handleSelect(i)}
            >
              {v.name}
            </Button>
          ))}
        </div>
        <div className={classes.image} style={{ backgroundImage: `url(${this.getImage()})` }} >
          <Button variant="fab" aria-label="edit" className={classes.toggleButton} onClick={this.toggleType}>
            <Sync />
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(style)(DollDetailIllustBox);
