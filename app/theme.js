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
      fontWeight: 550,
    },
    fontWeightLight: 400,
    fontWeightRegular: 50,
    fontWeightMedium: 600,
    fontWeightBold: 700
  }
});

export default theme;
