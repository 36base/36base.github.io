
const style = theme => ({
  root: {
    width: '100%',
    height: '100%',
  },
  titleWrapper: {
    zIndex: '200',
    boxSizing: 'border-box',
    display: 'flex',
    height: '64px',
    padding: '0 10px',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
  },
  skinImage: {
    maxWidth: '100vw',
  },
  contentWrapper: {
    zIndex: '200',
  },
  divider: {
    position: 'relative',
    zIndex: '200',
    width: 'calc(100% - 20px)',
    height: '3px',
    margin: '10px auto',
    backgroundColor: 'black',
  },
  imageWrapper: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
      maxWidth: '100%',
      flexBasis: '100%',
    },
  },
  infoWrapper: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
      maxWidth: '100%',
      flexBasis: '100%',
    },
  },
  nameWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  krName: {
    marginRight: '10px',
    fontSize: '1.5em',
    fontWeight: '700',
    color: '#37474F',
  },
  name: {
    fontSize: '1.2em',
    color: 'rgba(55,71,79,0.5)',
  },
  number: {
    fontSize: '1.2em',
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  infoBox: {
    width: '70%',
    margin: '30px 0px',
    [theme.breakpoints.down('md')]: {
      width: '90%',
      margin: '30px auto',
    },
  },
  infoTitle: {
    justifyContent: 'space-between',
    color: 'grey',
    fontSize: '1.25em',
    padding: '6px',
    borderBottom: '1px solid black',
  },
  infoSelector: {
    display: 'block',
    width: '50px',
    float: 'right',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '6px',
    borderBottom: '1px solid black',
  },
  rowTitle: {
    width: '30%',
  },
  graph: {
    width: '60%',
    height: '20px',
    border: '1px solid grey',
    borderRadius: '10px',
  },
  title: {
    justifyContent: 'space-between',
    color: 'grey',
    fontSize: '1.25em',
    padding: '6px',
    borderBottom: '1px solid black',
    clear: 'both',
  },
  titleName: {
    float: 'left',
  },
  skillName: {
    fontSize: '1.5em',
    color: 'rgba(0, 0, 0, 0.54)',
    fontWeight: '400',
    textAlign: 'center',
    margin: '10px',
  },
  skillBoxYellow: {
    color: '#FDA50C',
  },
});

export default style;
