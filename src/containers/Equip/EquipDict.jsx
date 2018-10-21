import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import EquipRepository from '../../repositories/EquipRepository';

import ViewTypePanel from '../../components/ViewTypePanel';
import EquipTable from './EquipTable';
import EquipGrid from './EquipGrid';
import EquipModal from './Modal/EquipModal';

// import * as dictActions from '../../store/modules/fairyDict';

const styles = {
  wrapper: {
    padding: '10',
    margin: '0',
  },
};

class EquipDict extends Component {
  constructor(props) {
    super(props);

    let selectedEquipId = null;

    const { match } = props;
    if (match.params.id) {
      selectedEquipId = Number(match.params.id);
    }

    this.state = {
      viewType: 'module',
      open: selectedEquipId !== null,
      selectedEquipId,
    };
  }

  handleOpen = (equipId) => {
    this.setState({
      selectedEquipId: equipId,
    }, () => {
      this.setState({ open: true });

      const { history } = this.props;
      history.push(`/equip/${equipId}`);
    });
  }

  handleClose = () => {
    this.setState({ open: false });

    const { history } = this.props;
    history.push('/equip');
  }


  handleChangeViewType = () => {
    const { viewType } = this.state;

    this.setState({ viewType: viewType === 'module' ? 'headline' : 'module' });
  }

  handleSortTable = (orderBy) => {
    const { sort } = this.props;

    sort(orderBy);
  }

  render() {
    const { classes, equips } = this.props;
    const { viewType, open, selectedEquipId } = this.state;

    return (
      <div>
        <ViewTypePanel viewType={viewType} onChangeView={this.handleChangeViewType} />
        {viewType === 'headline' && (
          <EquipTable
            equips={equips}
            onClick={(equipId) => { this.handleOpen(equipId); }}
          />
        )}
        {viewType === 'module' && (
          <EquipGrid
            className={classes.wrapper}
            equips={equips}
            onClick={(equipId) => { this.handleOpen(equipId); }}
          />
        )}
        <EquipModal
          open={open}
          handleClose={this.handleClose}
          info={EquipRepository.getNewById(selectedEquipId)}
        />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { equips } = state.equipDict;

  return {
    equips: Object.keys(equips).map(e => equips[e]),
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {}),
)(EquipDict);
