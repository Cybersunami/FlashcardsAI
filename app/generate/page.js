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
            {/*Adding Flashcard display after the API calls have been handled to generate the flashcards*/}
        </Container>
    )
}