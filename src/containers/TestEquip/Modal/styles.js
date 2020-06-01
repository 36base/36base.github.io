const styles = theme => ({
  popup: {
  },
  container: {
    padding: '20px',
  },
  boxWrapper: {
    minWidth: 200,
    marginBottom: 36,
    [theme.breakpoints.down('sm')]: {
      maxWidth: '90%',
      margin: '0 auto',
      marginBottom: 36,
    },
  },
  introduction: {
    padding: '10px',
  },
  button: {
    fontSize: '0.9em',
    padding: '5px',
    margin: '5px',
  },
});

export default styles;
