
const styles = theme => ({
  formControl: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
  },
  group: {
    display: 'flex',
    flexDirection: 'row',
    margin: `${theme.spacing.unit}px 0`,
  },
  container: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: '90%',
      margin: '0 auto',
    },
    [theme.breakpoints.up('md')]: {
      border: `1px solid ${theme.palette.primary.dark}`,
      width: '100%',
      maxWidth: 512,
      marginLeft: theme.spacing.unit * 10,
      marginTop: theme.spacing.unit * 5,
    },
  },
  timeCell: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRight: '1px solid black',
  },
  noPadding: {
    padding: 0,
  },
  link: {
    display: 'block',
    color: 'inherit',
    fontSize: 16,
    textDecoration: 'none',
    padding: '4px 0 2px 8px',
  },
  typeIconWrapper: {
    display: 'inline-block',
    position: 'relative',
    background: 'linear-gradient(140deg, black 90%, transparent 90%)',
    width: 64,
    height: 32,
  },
  typeIcon: {
    width: theme.spacing.unit * 8,
  },
  equipImageWrapper: {
    display: 'inline-block',
    position: 'relative',
    width: 64,
    height: 32,
  },
  star: {
    color: '#FFB600',
    fontStyle: 'none',
  },
  name: {
    fontWeight: 'bold',
  },
  general: { color: '#a2a2a2' },
  rare: { color: '#5DD9C3' },
  epochal: { color: '#D6E35A' },
  legendary: { color: '#FDA809' },
  extra: { color: '#D5A3FD' },
});

export default styles;
