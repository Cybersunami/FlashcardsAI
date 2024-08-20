import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Box, Button, Toolbar, Typography, Link as MuiLink } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function NavBar() {
  return (

    <div>
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcard from your text " />
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>


          <SignedOut>
            <Button color="inherit" href="/sign-in">
              SignIn/SignUp
            </Button>

            <MuiLink href="/" sx={{ color: 'black', textDecoration: 'none', fontWeight: 'medium' }}>Home</MuiLink>


          </SignedOut>
          <SignedIn>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginRight:4 }}>
              <MuiLink href="/" sx={{ color: 'black', textDecoration: 'none', fontWeight: 'medium' }}>Home</MuiLink>
              <MuiLink href="/generate" sx={{ color: 'black', textDecoration: 'none', fontWeight: 'medium' }}>Create Cards</MuiLink>
              <MuiLink href="/flashcards"  sx={{ color: 'black', textDecoration: 'none', fontWeight: 'medium' }}>Flashcards</MuiLink>
            </Box>
            <UserButton />
          </SignedIn>


        </Toolbar>
      </AppBar>
    </div>
  );
}
