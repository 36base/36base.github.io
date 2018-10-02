import React from 'react';
import axios from 'axios';
import { Card } from 'material-ui';
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

class StoryViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scenes: [],
    };

    this.buildScene = this.buildScene.bind(this);
  }
  componentWillMount() {
    axios.get('http://localhost:8887/texts/avgtxt/ko/mission/-24-9-2.json')
      .then(response => this.setState({ scenes: response.data }));
  }
  buildScene(scene) {
    const { classes } = this.props;

    const speaker = { name: '' };
    if (scene.characters) {
      if (scene.characters.length === 1) speaker.name = scene.characters[0].name;
      if (scene.speaker) {
        if (scene.speaker.name) {
          speaker.name = scene.speaker.name;
        } else {
          speaker.name = scene.characters[scene.speaker.index].name;
        }
      }
    }

    return (
      <div className={classes.container}>
        <div>
          <div>{speaker.name}</div>
        </div>
        <div>{scene.text}</div>
      </div>
    );
  }
  render() {
    const { scenes } = this.state;

    console.log(scenes);

    return (
      <div>
        <Card>
          {scenes.map(scene => this.buildScene(scene))}
        </Card>
      </div>
    );
  }
}

export default injectIntl(withStyles(style)(StoryViewer));
