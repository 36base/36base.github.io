import React from 'react';
import { Button } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const style = theme => ({
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
    margin: `0 ${theme.spacing.unit / 2}px`,
    marginBottom: theme.spacing.unit,
    padding: `${theme.spacing.unit / 4}px ${theme.spacing.unit / 2}px`,
    minHeight: theme.spacing.unit * 3,
  },
  image: {
    flexGrow: 1,
    zIndex: 20,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
});

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
      imgType: 'common',
    };

    this.setImageType = this.setImageType.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  getImage() {
    const { values, value, imgType } = this.state;
    const url = values[value][imgType];

    return {
      backgroundImage: `url(${url})`,
    };
  }

  setImageType(event, value) {
    this.setState({
      imgType: value,
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
        <div className={classes.image} style={this.getImage()} />
      </div>
    );
  }
}

export default withStyles(style)(DollDetailIllustBox);
