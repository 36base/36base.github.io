import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  container: {
    display: 'inline-block',
  },
  label: {
    fontFamily: 'Noto Sans KR',
    marginRight: theme.spacing.unit,
  },
  select: {
    '-webkit-box-sizing': 'border-box',
    '-moz-box-sizing': 'border-box',
    'box-sizing': 'border-box',
    '-webkit-appearance': 'none',
    '-moz-appearance': 'none',

    display: 'inline-block',
    width: '80px',
    height: '24px',
    lineHeight: '24px',
    margin: 3,
    padding: '0 0 0 8px',
    border: `1px solid ${theme.palette.primary.dark}`,
    verticalAlign: 'middle',

    backgroundImage: 'linear-gradient(45deg, transparent 50%, #5c5c5c 50%), linear-gradient(135deg, #5c5c5c 50%, transparent 50%)',
    backgroundPosition: 'calc(100% - 15px), calc(100% - 10px)',
    backgroundSize: '5px 6px',
    backgroundRepeat: 'no-repeat',
  },
});

const SmallSelector = (props) => {
  const {
    classes,
    label,
    values,
    selected,
    onChange,
  } = props;

  const options = values.map(e => <option key={e.value} value={e.value} >{e.name}</option>);

  return (
    <div>
      <span className={classes.label}>{label}</span>
      <select className={classes.select} value={selected} onChange={onChange}>
        {options}
      </select>
    </div>
  );
};

export default withStyles(styles)(SmallSelector);
