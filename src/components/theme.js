import { createMuiTheme } from 'material-ui/styles';
import * as Color from 'material-ui/colors';
import spacing from 'material-ui/styles/spacing';

const theme = createMuiTheme({
  spacing,
  palette: {
    primary: {
      main: Color.blueGrey[900],
    },
    secondary: {
      main: Color.cyan[900],
    },
    error: {
      main: Color.red[700],
    },
  },
  typography: {
    fontFamily: 'Noto Sans KR, sans-serif',
    title: {
      fontWeight: 700,
      fontSize: '3rem',
      color: Color.cyan[200],
    },
    button: {
      fontWeight: 500,
      fontSize: '1.75rem',
      color: Color.common.white,
      textTransform: undefined,
    },
  },
});

export default theme;
