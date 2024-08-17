import React from 'react'
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material'
import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignUpPage() {
    return(
        <AppBar position="static" sx={{backgroundColor: '#fff7ef'}}>
            <Toolbar>
                <Typography variant="h6" sx={{
                    flexGrow: 1,
                    color: '#221b15',
                    }}>
                    Flashcard SaaS
                </Typography>
                <Button variant="contained" color="inherit">
                    <Link 
                    href="/sign-up" 
                    passHref
                    >
                        Sign Up
                    </Link>
                </Button>
            </Toolbar>
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
    )
}