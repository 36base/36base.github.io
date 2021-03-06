import cardbg from './resources/cardbg.png';

const style = theme => ({
  root: {
    display: 'inline-block',
    position: 'relative',
    width: 170,
    height: 300,
    margin: 10,
    textDecoration: 'none',
    backgroundImage: `url(${cardbg})`,
    backgroundSize: '100%',
    [theme.breakpoints.down(480)]: {
      width: 150,
      height: 300,
      margin: '10px 5px',
      backgroundSize: '170px 300px',
    },
  },
  typeIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 74,
    height: 38,
  },
  rankbar: {
    height: 20,
    paddingRight: 5,
    textAlign: 'right',
    lineHeight: '20px',
    verticalAlign: 'middle',
  },
  portrait: {
    height: 212,
    backgroundSize: 340,
    overflow: 'hidden',
    zIndex: 1000,
    '&:hover': {
      backgroundPosition: '-100% 0',
    },
    [theme.breakpoints.down(480)]: {
      backgroundSize: 300,
      '&:hover': {
        backgroundPosition: '-100% 0',
      },
    },
  },
  caption: {
    position: 'absolute',
    left: 0,
    top: 232,
    width: 170,
    height: 30,
    paddingLeft: 10,
    fontFamily: 'Noto Sans KR',
    fontSize: 18,
    fontWeight: 500,
    lineHeight: '30px',
    fontStyle: undefined,
    color: '#404040',
    verticalAlign: 'middle',
  },
  no: {
    position: 'absolute',
    left: 135,
    top: 277,
    fontSize: 19,
    fontWeight: 400,
    color: '#ababab',
    [theme.breakpoints.down(480)]: {
      fontSize: 12,
      left: 129,
      lineHeight: '25px',
    },
  },

  general: { background: 'linear-gradient(135deg, #a2a2a2, #a2a2a2 85%, transparent 85%)' },
  rare: { background: 'linear-gradient(135deg, #5DD9C3, #5DD9C3 85%, transparent 85%)' },
  epochal: { background: 'linear-gradient(135deg, #D6E35A, #D6E35A 85%, transparent 85%)' },
  legendary: { background: 'linear-gradient(135deg, #FDA809, #FDA809 85%, transparent 85%)' },
  supreme: { background: 'linear-gradient(135deg, #FC4F00, #FC4F00 85%, transparent 85%)' },
  extra: { background: 'linear-gradient(135deg, #D5A3FD, #D5A3FD 85%, transparent 85%)' },

  star: {
    display: 'inline-block',
    width: 15,
    height: 15,
    transform: 'rotate(-20deg)',
    fontSize: 20,
    color: '#FFB600',
  },
});

export default style;
