
const style = {
  root: {
    width: '100%',
    height: '100%',
  },
  titleWrapper: {
    position: 'relative',
    zIndex: '200',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100px',
    width: '100%',
    padding: '0px 30px 0px 100px',
  },
  image: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
  },
  contentWrapper: {
    position: 'relative',
    zIndex: '200',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  divider: {
    position: 'relative',
    zIndex: '200',
    width: 'calc(100% - 20px)',
    height: '3px',
    margin: '0px auto',
    backgroundColor: 'black',
  },
  imageWrapper: {
    width: '50%',
    height: '100%',
  },
  infoWrapper: {
    width: '50%',
    minHeight: '100%',
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
  },
  infoTitle: {
    justifyContent: 'space-between',
    color: 'grey',
    fontSize: '1.25em',
    padding: '6px',
    borderBottom: '1px solid black',
  },
  infoSelector: {
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
};

export default style;
