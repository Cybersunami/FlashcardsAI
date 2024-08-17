'use client';

import {createTheme} from '@mui/material/styles'
//import GloriaHallelujah from './assests/fonts/GloriaHallelujah-Regular.ttf'

let theme = createTheme({
  palette: {
    primary: {
      main: '#fff7ef',
      contrastText: '#221b15'
    },
    secondary: {
      main: '#ba255c'
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#babaf2', // Override primary button background color
        },
        containedSecondary: {
          backgroundColor: '#c4003e', // Override secondary button background color
        },
        text: {
          color: '#7b0000'
        },
        root: {
          padding: '#24px 48px'
        },
      },
    },
  },
  typography: {
    h6: {
      fontWeight: 375
    },
    fontWeightLight: 300,
    fontWeightRegular: 350,
    fontWeightMedium: 500,
    fontWeightBold: 600
  }
});

export default theme;
