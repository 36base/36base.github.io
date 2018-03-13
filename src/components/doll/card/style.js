import cardbg from './resources/cardbg.png';

const style = {
  root: {
    display: 'inline-block',
    position: 'relative',
    width: 170,
    height: 300,
    margin: 10,
    textDecoration: 'none',
  },

  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundImage: `url(${cardbg})`,
    backgroundSize: '100%',
  },
  typeIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
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
  },

  general: { background: 'linear-gradient(135deg, #FFFFFF, #FFFFFF 85%, transparent 85%)' },
  rare: { background: 'linear-gradient(135deg, #5DD9C3, #5DD9C3 85%, transparent 85%)' },
  epochal: { background: 'linear-gradient(135deg, #D6E35A, #D6E35A 85%, transparent 85%)' },
  legendary: { background: 'linear-gradient(135deg, #FDA809, #FDA809 85%, transparent 85%)' },
  extra: { background: 'linear-gradient(135deg, #D5A3FD, #D5A3FD 85%, transparent 85%)' },
  star: {
    display: 'inline-block',
    width: 15,
    height: 15,
    transform: 'rotate(-20deg)',
    fontSize: 20,
    color: '#FFB600',
  },
};

export default style;
