
const styles = theme => ({
  wrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
  },
  header: {
    paddingTop: '2%',
    height: '13%',
    paddingRight: 25,
  },
  titleLine: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  img: {
    verticalAlign: 'top',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '0 auto',
    },
    [theme.breakpoints.up('md')]: {
      display: 'inline-block',
      width: '70vh',
      height: `calc(100vh - 15% - ${theme.mixins.toolbar.minHeight}px)`,
    },
  },
  info: {
    [theme.breakpoints.up('md')]: {
      display: 'inline-block',
      width: 'calc(100% - 70vh)',
      height: '85%',
      overflow: 'auto',
    },
  },
  boxWrapper: {
    minWidth: 200,
    marginBottom: 36,
    [theme.breakpoints.down('sm')]: {
      maxWidth: '90%',
      margin: '0 auto',
      marginBottom: 36,
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: 500,
    },
  },
  button: {
    display: 'block',
    padding: '15px',
    fontSize: '17px',
    textDecoration: 'none',
    color: 'black',
    textAlign: 'center',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: '1px',
  },
});

export default styles;
