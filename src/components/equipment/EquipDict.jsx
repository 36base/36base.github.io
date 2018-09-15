import React from 'react';
import { withStyles } from 'material-ui/styles';

import { Grid, Modal } from 'material-ui';

import EquipRepository from './../../repositories/EquipRepository';

import EquipPopup from './popup/EquipPopup';
import EquipCard from './card/EquipCard';

const style = {
  wrapper: {
    padding: '10',
    margin: '0',
  },
  cardWrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
};

class EquipDict extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false, list: [], selectedEquip: null };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentWillMount() {
    EquipRepository.fetchAll()
      .then(list => this.setState({ list }));
  }
  handleOpen(equipData) {
    this.setState({
      selectedEquip: equipData,
    }, () => {
      this.setState({ open: true });
    });
  }
  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <Grid className={classes.cardWrapper} container>
          {this.state.list.map(equip => (
            <Grid item xs={6} sm={3} md={2} role="button" tabIndex={0} onClick={() => this.handleOpen(equip)}>
              <EquipCard key={equip.id} info={equip} />
            </Grid>
          ))}
        </Grid>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
        >
          <EquipPopup className={classes.popup} info={this.state.selectedEquip} />
        </Modal>
      </div>
    );
  }
}

export default withStyles(style)(EquipDict);
