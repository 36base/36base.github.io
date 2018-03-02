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
  },
  typography: {
    fontFamily: ['Noto Sans KR', 'Roboto', 'sans-serif'],
    fontSize: 14,
    button: {
      textTransform: undefined,
    },
  },
});

export default theme;
