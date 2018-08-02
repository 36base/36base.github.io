import { createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  breakpoints: {
    // xs ~ md : 모바일 화면
    // md ~ lg : pc화면(메뉴 토글처리)
    // lg ~ xl : pc화면(메뉴 고정처리)
    values: {
      xs: 0,
      sm: 600,
      md: 1240,
      lg: 1560,
      xl: 1980,
    },
  },
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
    fontFamily: ['Noto Sans KR', 'Rounded Mplus 1c', 'sans-serif'],
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
