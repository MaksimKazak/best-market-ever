import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css';
import App from './components/App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as serviceWorker from './serviceWorker';
require('typeface-roboto');

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4dabf5',
      main: '#2196f3',
      dark: '#1769aa',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}><App /></MuiThemeProvider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
