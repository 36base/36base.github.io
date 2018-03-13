import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import InfoBox from '../../utils/InfoBox';
import Square from '../../utils/Square';
import ImageBox from '../../utils/ImageBox';
import SmallSelector from '../../utils/SmallSelector';

import { selectSkillLv } from '../../../actions/doll';

const style = theme => ({
  container: {
    padding: `${theme.spacing.unit}px 0`,
  },
  iconWrapper: {
    maxWidth: theme.spacing.unit * 8,
    margin: '0 auto',
  },
  icon: {
    border: '1px solid red',
  },
  alignMiddle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  alignBottom: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  yellow: {
    color: '#FDA50C',
  },
});

const lvValues = Array(10).fill().map((_, i) => ({ value: i + 1, name: i + 1 }));

function buildDescription(template, dataPool, lv) {
  return Array.from(dataPool).reduce((desc, entry) => {
    const key = entry[0];
    const value = entry[1];

    return desc.replace(`{${key}}`, value.values[lv - 1]);
  }, template);
}

const SkillBox = (props) => {
  const { classes, dataPool, lv } = props;

  const getData = key => dataPool.get(key).values[lv - 1];
  const description = buildDescription(props.template, dataPool, lv);
  const selector = <SmallSelector label="레벨" values={lvValues} selected={lv} onChange={props.onChange} />;

  return (
    <InfoBox name="스킬" selector={selector}>
      <Grid className={classes.container} container>
        <Grid item xs={4}>
          <div className={classes.iconWrapper}>
            <Square><ImageBox src={props.icon} /></Square>
          </div>
        </Grid>
        <Grid className={classes.alignMiddle} item xs={4}>
          <Typography variant="display3">{props.name}</Typography>
        </Grid>
        <Grid className={classes.alignBottom} item xs={4}>
          <Typography align="right" variant="body1">
            초기 쿨타임 <span className={classes.yellow}>{props.initCooldown}초</span>
          </Typography>
          <Typography align="right" variant="body1">
            쿨타임 <span className={classes.yellow}>{getData('CD')}초</span>
          </Typography>
          <Typography align="right" variant="body1">
            지속시간 <span className={classes.yellow}>{getData('DR')}초</span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>{description}</Typography>
        </Grid>
      </Grid>
    </InfoBox>
  );
};

const stateMapper = state => state.dolldetail.skill;
const dispatchMapper = dispatch => ({
  onChange: e => dispatch(selectSkillLv(e.target.value)),
});

export default connect(stateMapper, dispatchMapper)(withStyles(style)(SkillBox));
