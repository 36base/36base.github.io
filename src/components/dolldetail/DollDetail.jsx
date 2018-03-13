import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import { mount } from '../../actions/doll';

import HorizonLine from '../common/HorizonLine';
import Background from './components/Background';
import Caption from './components/Caption';
import NumberBox from './components/NumberBox';
import SkinTabbar from './components/SkinTabbar';
import StarBox from './components/StarBox';
import TypeSwitchBox from './components/TypeSwitchBox';
import Illust from './components/Illust';
import BasicInfoBox from './components/BasicInfoBox';
import StatusInfoBox from './components/StatusInfoBox';
import SkillBox from './components/SkillBox';
import EffectBox from './components/EffectBox';
import AcquisitionInfoBox from './components/AcquisitionInfoBox';

const style = theme => ({
  wrapper: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  header: {
    paddingTop: '2%',
    paddingRight: 25,
  },
  headerDivider: {
    width: '100%',
    height: 3,
    backgroundColor: theme.palette.primary.dark,
  },
  content: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    margin: 0,
    width: '100%',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 512,
    flex: 1,
  },
  right: {
    flex: 1,
    overflow: 'auto',
  },
  boxWrapper: {
    minWidth: 200,
    maxWidth: 400,
    marginBottom: 36,
  },
});

class DollDetail extends React.Component {
  constructor(props) {
    super(props);

    this.wrap = this.wrap.bind(this);
  }

  componentWillMount() {
    this.props.mount(Number(this.props.match.params.id));
  }

  wrap(content) {
    return (
      <Grid className={this.props.classes.boxWrapper} item xs={12}>
        {content}
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <Background mainColor="#505694" secondColor="#8C94BF" />
        <div className={classes.header}>
          <Grid container>
            <Caption />
            <NumberBox />
            <HorizonLine height={3} />
            <SkinTabbar />
            <StarBox />
          </Grid>
        </div>
        <Grid className={classes.content} container >
          <Grid className={classes.left} item>
            <TypeSwitchBox />
            <Illust />
          </Grid>
          <Grid className={classes.right} item>
            {this.wrap(<BasicInfoBox />)}
            {this.wrap(<StatusInfoBox />)}
            {this.wrap(<SkillBox />)}
            {this.wrap(<EffectBox />)}
            {this.wrap(<AcquisitionInfoBox />)}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const stateMapper = undefined;
const dispatchMapper = dispatch => ({
  mount: id => dispatch(mount(id)),
});

export default connect(stateMapper, dispatchMapper)(withStyles(style)(DollDetail));
