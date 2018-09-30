import React from 'react';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';

import EquipCard from '../../components/equip/equipcard/EquipCard';

const styles = {
  cardWrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
};

class EquipGrid extends React.Component {
  render() {
    const {
      t,
      classes,
      className,
      equips,
      onClick,
    } = this.props;

    return (
      <div className={className}>
        <Grid className={classes.cardWrapper} container>
          {equips.map(equip => (
            <Grid key={equip.id} item xs={6} sm={3} md={2} role="button" tabIndex={0} onClick={() => { onClick(equip.id); }}>
              <EquipCard
                rank={equip.rank}
                codename={equip.codename}
                name={t(equip.name)}
                color={equip.color}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default compose(
  translate(),
  withStyles(styles),
)(EquipGrid);
