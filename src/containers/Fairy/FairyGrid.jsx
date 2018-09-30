import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import FairyCard from '../../components/Fairy/FairyCard/FairyCard';

const FairyGrid = ({
  t, className, fairies, onClick,
}) => (
  <Grid className={className} container spacing={8} justify="space-around">
    {fairies.map(({
      id, codename, name,
      category, introduce, description, skins, skill,
    }) => (
      <Grid item key={id} xs={12} sm={6} md={4} lg={3} xl={2} onClick={() => { onClick(id); }}>
        <FairyCard
          codename={codename}
          name={t(name)}
          category={category}
          introduce={t(introduce)}
          description={t(description)}
          skins={skins}
          skill={{
            codename: skill.codename,
            name: t(skill.name),
          }}
        />
      </Grid>
    ))}
  </Grid>
);
FairyGrid.propTypes = {
  className: PropTypes.string.isRequired,
  fairies: PropTypes.arrayOf(PropTypes.object).isRequired,
  t: PropTypes.func.isRequired,
};

export default compose(
  translate(),
)(FairyGrid);
