import cardbg from './resources/fairy_bg.png';
import iconBattle from './resources/battle.png';
import iconStrategy from './resources/strategy.png';

const style = {
  root: {
    display: 'inline-block',
    position: 'relative',
    margin: '10px',
    width: 170,
    height: 300,
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

  },
  info: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    marginBottom: '20px',
    textAlign: 'center',
  },
  krName: {
    marginBottom: '10px',
    fontSize: '1.2em',
    fontWeight: '600',
    color: '#e2e2e2',
  },
  skillName: {
    color: '#ee662a',
  },
  id: {
    color: '#fefefe',
  },
  skillIdWrapper: {

  },
  battle: {
    backgroundImage: `url(${iconBattle})`,
  },
  strategy: {
    backgroundImage: `url(${iconStrategy})`,
  },
  icon: {
    position: 'absolute',
    width: '24px',
    height: '24px',
    backgroundSize: '100%',
    margin: '8px',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '180px',
    marginTop: '30px',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
  },
};

export default style;
