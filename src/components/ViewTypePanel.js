import React from 'react';
import PropTypes from 'prop-types';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  toggleContainer: {
    height: 56,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: `${theme.spacing.unit}px 0`,
    background: theme.palette.background.default,
  },
});

const ViewTypePanel = ({ classes, viewType, onChangeView }) => (
  <div className={classes.toggleContainer}>
    <ToggleButtonGroup value={viewType} exclusive onChange={onChangeView}>
      <ToggleButton value="module">
        <ViewModuleIcon />
      </ToggleButton>
      <ToggleButton value="headline">
        <ViewHeadlineIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  </div>
);
ViewTypePanel.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  viewType: PropTypes.string.isRequired,
  onChangeView: PropTypes.func.isRequired,
};

export default withStyles(styles)(ViewTypePanel);
