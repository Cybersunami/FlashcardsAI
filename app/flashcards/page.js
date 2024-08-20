"use client";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "../../firebase"; // Misa - Imported the all of the dependencies.
import NavBar from "../NavBar";
import theme from "../theme";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);

  const router = useRouter();

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // Misa - changed the field name from flashcard to flashcardSet
        const collections = docSnap.data().flashcardSets;
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }
    getFlashcards();
  }, [user]);

  // navigates to individual flashcard sets when user clicks on a set
  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };

  return (
    <ThemeProvider theme={theme}>

    <Container maxWidth="md">
      <NavBar />
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {flashcard.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </ThemeProvider>
  );
}
