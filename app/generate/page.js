"use client";
// page responsible for generating flashcards
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Toolbar,
  AppBar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import { db } from "../../firebase";
import FlashCardComponent from "../FlashCardComponent";
import NavBar from "../NavBar";

export default function Generate() {
  const {isLoaded, isSignedIn, user} = useUser()
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([])

  // state for the flashcard set name
  const [setName, setSetName] = useState("");
  // state for dialog open state
  const [dialogOpen, setDialogOpen] = useState(false);

  // functions to handle opening and closing the dialog
  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);



  useEffect(() => {

  }, [flashcards])

  const handleSubmit = async () => {
    try {
      // sends POST request to /api/generate endpoint with the text that has been inputted
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      // if response is incorrect/error occurs
      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      // if response is successful, updates the flashcards with generated data
      const data = await response.json();
      console.log("API response:", data.flashcards);
      let flashcardsArray;
      let nestArray;
      if (Array.isArray(data.flashcards)) {
        flashcardsArray = data.flashcards;
      } else if (typeof data.flashcards === 'object') {
        flashcardsArray = Object.values(data.flashcards);
        nestArray = flashcardsArray[0]
        setFlashcards(nestArray)
      } else {
        throw new Error("Invalid flashcards data format");
      } 
      handleOpenDialog(); // not sure if we need this
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("An error occured while generating flashcards. Please try again.");
    }
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // function that saves flashcards to Firebase
  const saveFlashcards = async () => {
    if (!setName.trim()) {
      alert("Please enter a name for you flascard set.");
      return;
    }

    try {
      const userDocRef = doc(collection(db, "users"), user.id);
      const userDocSnap = await getDoc(userDocRef);
      const batch = writeBatch(db);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const updatedSets = [
          ...(userData.flashcardSets || []),
          { name: setName },
        ];
        batch.update(userDocRef, { flashcardSets: updatedSets });
      } else {
        batch.set(userDocRef, { flashcardSets: [{ name: setName }] });
      }

      const setDocRef = doc(collection(userDocRef, "flashcardSets"), setName);
      batch.set(setDocRef, { flashcards });

      await batch.commit();

      alert("Flashcards saved successfully!");
      handleCloseDialog();
      setSetName("");
    } catch (error) {
      console.error("Error saving flashcards:", error);
      alert("An error occurred while saving flashcards. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
      <NavBar />

        <Box
          sx={{
            my: 4,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              textAlign: "center",
            }}
          >
            Generate Flashcards
          </Typography>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter Text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{
              mb: 2,
              color: "#221b15",
              backgroundImage:
                "url(https://img.freepik.com/premium-photo/notebook-paper-background-lined-notebook-paper-crumpled-paper-background_322958-3948.jpg)",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Generate Flashcards
          </Button>
        </Box>

        {/*Flashcard Disply*/}
        {flashcards.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Generated Flashcards
            </Typography>
            <Grid container spacing={2}>
             {/** Misa - I made it so after generating the cards, it will display the bottom of the screen. */} 
              {flashcards.map((flashcard, index) => (
                <FlashCardComponent flashcard={flashcard} handleCardClick={handleCardClick}/>
              ))}
            </Grid>
          </Box>
        )}
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Save Flashcard Set</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your flashcard set.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Set Name"
              type="text"
              fullWidth
              value={setName}
              onChange={(e) => setSetName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={saveFlashcards} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
