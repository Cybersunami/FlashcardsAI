"use client"

import Image from "next/image";
import Stripe from 'stripe'
import getStripe from "../utils.js/get-stripe";
import{SignedIn, SignedOut, UserButton} from '@clerk/nextjs'
import {Container, Toolbar, Typography, Button, AppBar, Box, Grid} from '@mui/material'
import Head from 'next/head'
import { ThemeProvider } from "@mui/material/styles";
import theme from './theme'


export default function Home() {

  // handleSubmit handles the Stripe checkout process
  const handleSubmit = async (plan) => {

    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'applications/json',
        origin: 'https://hocalhost:3000',
      },
      body: JSON.stringify({ plan}), // sends the selected plan to the server
    })

    // converts the response to JSON
    const checkoutSessionJson = await checkoutSession.json();

    const stripe = await getStripe();

    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error) {
      console.warn(error.message);
    }
  }




  return (
    <ThemeProvider theme={theme}>
      <Container 
        maxWidth="100%" 
        sx={{
          margin: '0',
          padding: '0',
          minHeight: '100vh',
          backgroundImage: 'url(https://img.freepik.com/premium-photo/notebook-paper-background-lined-notebook-paper-crumpled-paper-background_322958-3948.jpg)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Head>
          <title>Flashcard SaaS</title>
          <meta name="description" content="Create flashcard from your text "/>
        </Head>
        <AppBar position="static">
          <Toolbar>
            <Typography 
            variant ="h6" 
            component="div" 
            sx={{flexGrow:1}}
            >
              Flashcard SaaS
            </Typography>
            <SignedOut>
              <Button 
                color="inherit" 
                href="/sign-in"
              >
                Login
              </Button>
              <Button 
                variant="contained"
                color="inherit" 
                href="/sign-up"
                sx={{
                  backgroundColor: '#eb8da1',
                  borderRadius: '8px'
                }}
                >
                  Sign Up
                </Button>
            </SignedOut>
            <SignedIn>
              <UserButton/>
            </SignedIn>
          </Toolbar>
        </AppBar>

        <Box sx={{textAlign:'center', my: 4}}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Flashcard Saas
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            The easiest way to create flashcards from your text.
          </Typography>
          <Button variant="contained" color="primary" sx={{mt:2, mr:2}} href="/generate">
            Start Here
          </Button>
        </Box>

        <Box sx={{
          my: 6,
        }}>
          
          {/* Feature section
          <Typography variant="h4" component="h2" gutterBottom>Features</Typography>*/}
          <Grid 
            container spacing={4}
            justifyContent= "center"
            >
            <Grid 
            item 
            xs={12} 
            md={4} 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', // Centers content horizontally
              textAlign: 'center',  // Centers text within the Typography
            }}            >
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{
                  textAlign:'center',
                  padding: 1,
                  border: '2px solid',
                  borderRadius: '10px',
                  display: 'inline-block',
                  backgroundColor: '#fff7ef',
                }}
                >Easy Text Input</Typography>
                <Typography
                  sx={{
                    padding: '8px',
                    fontSize: '1.1rem',
                    textAlign:'center',
                    textShadow: `
                      2px 2px 0px #fff, 
                      -2px -2px 0px #fff, 
                      2px -2px 0px #fff, 
                      -2px 2px 0px #fff, 
                      2px 2px 5px #fff
                    `,
                      }}
                  >
                    Simply input your text and let our software do the rest. 
                Creating flashcards has never been easier</Typography>
            </Grid>
            <Grid 
              item 
              xs={12} 
              md={4}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // Centers content horizontally
                textAlign: 'center',  // Centers text within the Typography
              }}            
            >
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{
                  padding: 1,
                  border: '2px solid ',
                  borderRadius: '10px',
                  display: 'inline-block',
                  backgroundColor: '#fff7ef',
                }}
              >Smart Flashcards</Typography>
              <Typography 
                
                sx={{ padding: '8px',
                      fontSize: '1.1rem',
                      textAlign:'center',
                      textShadow: `
                        2px 2px 0px #fff, 
                        -2px -2px 0px #fff, 
                        2px -2px 0px #fff, 
                        -2px 2px 0px #fff, 
                        2px 2px 5px #fff
                      `,
                    }}
               >Our AI intelligently breaks down your text into concise flashcards,
                perfect for studying.
              </Typography>
            </Grid>
            <Grid 
              item 
              xs={12} 
              md={4}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // Centers content horizontally
                textAlign: 'center',  // Centers text within the Typography
              }}            
            >
                <Typography 
                variant="h6" 
                gutterBottom
                sx={{
                  padding: 1,
                  border: '2px solid ',
                  borderRadius: '10px',
                  display: 'inline-block',
                  backgroundColor: '#fff7ef',
                }}
              >Accessible Anywhere</Typography>
              <Typography sx={{ 
                          padding: '8px',
                          fontSize: '1.1rem',
                          textAlign:'center',
                          textShadow: `
                            2px 2px 0px #fff, 
                            -2px -2px 0px #fff, 
                            2px -2px 0px #fff, 
                            -2px 2px 0px #fff, 
                            2px 2px 5px #fff
                          `,
                          }}
              >Accessible Flashcards Anywhere. Study on the go with ease!</Typography>
            </Grid>
          </Grid>
        </Box>
      
        <Box sx={{my:6, textAlign:'center'}}>
          <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom
          sx={{
            border: '2px solid',
            borderRadius: '10px',
            padding: 1,
            backgroundColor: '#fff7ef',
          }}>Subscription Plans</Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: '16px',
                backgroundColor: '#d6eca0'
              }}>
                <Typography variant="h6" fontWeight="Bold">Basic</Typography>
                <Typography variant="h6">$5 / Month</Typography>
                <Typography gutterBottom>
                  Access to Basic Flashcard Features and Limited Storage</Typography>
                <Button variant="contained" onClick={() => handleSubmit('basic')}>Choose Basic</Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
            <Box sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: '16px',
                backgroundColor: '#a0ecdb'
              }}>
                <Typography variant="h6" fontWeight="Bold">Pro</Typography>
                <Typography variant="h6">$10 / Month</Typography>
                <Typography gutterBottom>
                  Unlimited Flashcard Features and Storage with Priority Support</Typography>
                <Button variant="contained" onClick={() => handleSubmit('pro')}>Choose Pro</Button>
              </Box>
            </Grid>
          </Grid>

        </Box>
      </Container>
    </ThemeProvider>
  )


}
