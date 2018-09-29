import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { fairies as fairyData } from 'girlsfrontline-core';
import Fairy from 'girlsfrontline-core/lib/fairy';
import ViewTypePanel from '../../components/ViewTypePanel';
import FairyTable from './FairyTable';
import FairyGrid from './FairyGrid';

import * as dictActions from '../../store/modules/fairyDict';

const fairies = fairyData.map(fairy => new Fairy(fairy.toJSON())).map(({
  id, codename, name, category, buildTime, skill, stats, introduce, description, skins,
}) => ({
  id,
  codename,
  name,
  category,
  introduce,
  description,
  skins,
  buildTime,
  skill,
  pow: stats.pow || 0,
  hit: stats.hit || 0,
  dodge: stats.dodge || 0,
  criticalHarmRate: stats.criticalHarmRate || 0,
  armor: stats.armor || 0,
}));

const styles = () => ({
  grid: {
    width: '100%',
    paddingLeft: 8,
    paddingRight: 8,
  },
});

class FairyDict extends Component {
  handleChangeViewType = (event, viewType) => {
    const { changeView } = this.props;

    changeView(viewType);
  }

  render() {
    const { classes, viewType } = this.props;
    return (
      <div>
        <ViewTypePanel viewType={viewType} onChangeView={this.handleChangeViewType} />
        {viewType === 'headline' && <FairyTable fairies={fairies} />}
        {viewType === 'module' && <FairyGrid className={classes.grid} fairies={fairies} />}
      </div>
    );
  }
}
FairyDict.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  changeView: PropTypes.func.isRequired,
  viewType: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const { viewType } = state.fairyDict;
  return {
    viewType,
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(dictActions, dispatch),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(FairyDict);
