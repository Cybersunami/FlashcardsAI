'use client'

import {useState} from 'react'
import {useUser} from '@clerk/nextjs'
import {Container,
    TextField,
    Button,
    Typography,
    Box,} from '@mui/material'

export default function Generate() {
    const {isLoaded, isSignedIn, user} = useUser()
    const [text, setText] = useState('')
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])

    const handleSubmit = async () => {
        //Implement the API call here
    }

    return (
        <Container maxWidth="md">
            {/*Generate Flashcard Natassia Notes: Make it centered on the page*/}
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
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
                sx={{ mb: 2 }}
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
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                        <CardContent>
                        <Typography variant="h6">Front:</Typography>
                        <Typography>{flashcard.front}</Typography>
                        <Typography variant="h6" sx={{ mt: 2 }}>Back:</Typography>
                        <Typography>{flashcard.back}</Typography>
                        </CardContent>
                    </Card>
                    </Grid>
                ))}
                </Grid>
            </Box>
            )}
        </Container>
    )
}