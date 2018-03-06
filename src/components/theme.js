import { createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#62727B',
      main: '#37474F',
      dark: '#102027',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#4FB3BF',
      main: '#00838F',
      dark: '#005662',
      constrastText: '#FFFFFF',
    },
    general: { main: '#FFFFFF' },
    rare: { main: '#5DD9C3' },
    epochal: { main: '#D6E35A' },
    legendary: { main: '#FDA809' },
    extra: { main: '#D5A3FD' },
  },
  typography: {
    fontFamily: ['Noto Sans KR', 'sans-serif'],
    fontSize: 14,
    button: {
      textTransform: undefined,
    },
    caption: {
      fontSize: '2rem',
    },
    display1: {
      fontSize: '1rem',
    },
    display2: {
      fontSize: '1.25rem',
    },
    display3: {
      fontSize: '1.5rem',
    },
  },
});

export default theme;
