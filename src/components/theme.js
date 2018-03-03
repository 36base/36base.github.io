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
    fontFamily: ['Roboto', 'Noto Sans KR', 'sans-serif'],
    fontSize: 14,
    button: {
      textTransform: undefined,
    },
  },
});

export default theme;
