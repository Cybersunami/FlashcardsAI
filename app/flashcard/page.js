"use client";

import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { minHeight, styled, ThemeProvider } from "@mui/system";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { db } from "../../firebase";
import NavBar from "../NavBar";
import FlashCardComponent from "../FlashCardComponent";
import theme from "../theme";

const FlipCard = styled("div")(({ flipped }) => ({
  position: "relative",
  width: "100%",
  height: "200px", 
  transformStyle: "preserve-3d",
  transition: "transform 0.6s",
  transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
  "& .card-face, & .card-back": {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    boxSizing: "border-box",
  },
  "& .card-back": {
    transform: "rotateY(180deg)",
  },
}));

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});

  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return
  
      const docRef = doc(db, 'users', user.id, 'flashcardSets', search);
      const docSnap = await getDoc(docRef);
      let fetchedFlashCards
      fetchedFlashCards = docSnap.data()
      fetchedFlashCards = Object.values(fetchedFlashCards)
      setFlashcards(fetchedFlashCards[0])
    }
    getFlashcard()
  }, [search, user])

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <ThemeProvider theme={theme}>
    <Container maxWidth="md">
      <NavBar />
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard) => (
         <FlashCardComponent flashcard={flashcard} />
        ))}
      </Grid>
    </Container>
    </ThemeProvider>
  );
}
