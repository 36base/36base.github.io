import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

import { Grid, Modal } from 'material-ui';

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

const stateMapper = state => ({
  equips: state.equipdict.list,
});

class EquipDict extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false, data: null };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleOpen(equipData) {
    this.setState({
      data: equipData,
    }, () => {
      this.setState({ open: true });
    });
  }
  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { equips, classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <Grid className={classes.cardWrapper} container>
          {equips.map(equip => (
            <Grid item xs={6} sm={3} md={2} role="button" tabIndex={0} onClick={() => this.handleOpen(equip)}>
              <EquipCard {...equip} />
            </Grid>
          ))}
        </Grid>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
        >
          <EquipPopup className={classes.popup} {...this.state.data} />
        </Modal>
      </div>
    );
  }
}

export default withStyles(style)(connect(stateMapper)(EquipDict));
