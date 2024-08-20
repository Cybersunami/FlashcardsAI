import React from 'react'
import { Container, Box, Typography, AppBar, Toolbar, Button, Link as MuiLink, ThemeProvider} from '@mui/material'
import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import NavBar from '../../NavBar'
import theme from '../../theme'

export default function SignUpPage() {
    return(
        <ThemeProvider theme={theme}>

        <AppBar position="static" sx={{backgroundColor: '#fff7ef'}}>
            <NavBar />
            <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{textAlign: 'center', my: 4}}
            >
            <Typography variant="h4" component="h1" gutterBottom>
                Sign In
            </Typography>

            <SignIn />
            </Box>
        </AppBar>
        </ThemeProvider>
    )
}