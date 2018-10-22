import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import EquipRepository from '../../repositories/EquipRepository';

import ViewTypePanel from '../../components/ViewTypePanel';
import EquipTable from './EquipTable';
import EquipGrid from './EquipGrid';
import EquipModal from './Modal/EquipModal';

import SearchBar from '../../components/SearchBar';

import Predicate from '../../repositories/data/predicate';

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
      filter: {
        rank: [],
        type: [],
        name: [],
      },
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

  addFilter = type => (newData) => {
    this.setState(prevState => ({
      ...prevState,
      filter: {
        ...prevState.filter,
        [type]: [...prevState.filter[type], newData],
      },
    }));
  }

  removeFilter = type => (target) => {
    this.setState(prevState => ({
      ...prevState,
      filter: {
        ...prevState.filter,
        [type]: prevState.filter[type].filter(e => (
          (typeof target === 'string') ? (e.indexOf(target) !== 0) : (e !== target)
        )),
      },
    }));
  }

  render() {
    const { t, classes, equips } = this.props;
    const {
      viewType,
      open,
      selectedEquipId,
      filter,
    } = this.state;

    const searchData = {
      rank: {
        type: 'checkbox',
        label: t('Stat.rarity'),
        data: [
          { value: '2', label: `2${t('PageMessage.Star')}` },
          { value: '3', label: `3${t('PageMessage.Star')}` },
          { value: '4', label: `4${t('PageMessage.Star')}` },
          { value: '5', label: `5${t('PageMessage.Star')}` },
        ],
        action: {
          add: this.addFilter('rank'),
          remove: this.removeFilter('rank'),
        },
      },
      name: {
        type: 'input',
        label: t('PageMessage.Name, Alias'),
        action: {
          add: this.addFilter('name'),
          remove: this.removeFilter('name'),
        },
      },
    };

    return (
      <div>
        <Grid item xs={12}>
          <SearchBar data={searchData} />
        </Grid>
        <ViewTypePanel viewType={viewType} onChangeView={this.handleChangeViewType} />
        {viewType === 'headline' && (
          <EquipTable
            equips={equips.filter(equip => Predicate.equipPredicate(t, filter)(equip))}
            onClick={(equipId) => { this.handleOpen(equipId); }}
          />
        )}
        {viewType === 'module' && (
          <EquipGrid
            className={classes.wrapper}
            equips={equips.filter(equip => Predicate.equipPredicate(t, filter)(equip))}
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
  translate(),
  withStyles(styles),
  connect(mapStateToProps, {}),
)(EquipDict);
