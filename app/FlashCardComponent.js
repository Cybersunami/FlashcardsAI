// Misa - Made this card component to reuse in other screens.
import React, { useState } from 'react';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

const FlipCard = styled("div")(({ flipped }) => ({
    position: "relative",
    minWidth: "500px", 
    height: "300px",
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
      borderRadius: "15px", 
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", 
      backgroundColor: "#ffffff", 
    },
    "& .card-back": {
      transform: "rotateY(180deg)",
    },
}));

export default function FlashCardComponent({ flashcard, handleCardClick }) {
  const [flipped, setFlipped] = useState({});

  const handleClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Grid item xs={12} sm={12} md={6} key={flashcard.id}>
      <Card sx={{ borderRadius: "15px", overflow: "hidden" }}>
        <CardActionArea onClick={() => handleClick(flashcard.id)}>
          <CardContent>
            <FlipCard flipped={!!flipped[flashcard.id]}>
              <Box className="card-face">
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    textAlign: "left",
                    maxWidth: "80%", 
                    marginRight: "20%", 
                  }}
                >
                  {flashcard.front}
                </Typography>
              </Box>
              <Box className="card-back">
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    textAlign: "left",
                    maxWidth: "80%", 
                    marginRight: "10%",
                  }}
                >
                  {flashcard.back}
                </Typography>
              </Box>
            </FlipCard>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
