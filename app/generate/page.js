'use client'
// page responsible for generating flashcards
import {useState} from 'react'
import {useUser} from '@clerk/nextjs'
import {Container,
    TextField,
    Button,
    Typography,
    Box,
    Toolbar,
    AppBar,} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../theme'

export default function Generate() {
    const {isLoaded, isSignedIn, user} = useUser()
    const [text, setText] = useState('')
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])

    // state for the flashcard set name 
    const [setName, setSetName] = useState('')
    // state for dialog open state
    const [dialogOpen, setDialogOpen] = useState(false)

    // functions to handle opening and closing the dialog
    const handleOpenDialog = () => setDialogOpen(true)
    const handleCloseDialog = () => setDialogOpen(false)

    const handleSubmit = async () => {

        // // checks if input text is empty, shows alert if it is
        // if (!text.trim()) {
        //     alert('Please enter some text to generate flashcards.')
        //     return
        // }

        // const response = await fetch('/api/generate', {
        //     method: 'POST',
        //     body: text,
        // })

        // // if response is incorrect/error occurs
        // if (!response.ok) {
        //     throw new Error('Failed to generate flashcards')
        // }


        // if response is successful, updates the flashcards with generated data
        // const data = await response.json()
        // setFlashcards(data)

        try {
            // sends POST request to /api/generate endpoint with the text that has been inputted
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ text })
            })

            // if response is incorrect/error occurs
            if (!response.ok) {
                throw new Error('Failed to generate flashcards')
            }

            // if response is successful, updates the flashcards with generated data
            const data = await response.json()
            console.log('API response:', data)
            setFlashcards(data.flashcards)
        }   catch (error) {
            console.error('Error generating flashcards:', error)
            alert('An error occured while generating flashcards. Please try again.')
        }    
    }

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }


     // function that saves flashcards to Firebase
    const saveFlashcards = async () => {
        if (!setName.trim()) {
            alert('Please enter a name for you flascard set.')
            return
        }

        try {
            const userDocRef = doc(collection(db, 'users'), user.id)
            const userDocSnap = await getDoc(userDocRef)
            const batch = writeBatch(db)

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data()
                const updatedSets = [...(userData.flashcardSets || []), { name: setName }]
                batch.update(userDocRef, { flashcardSets: updatedSets })
            } else {
                batch.set(userDocRef, { flashcardSets: [{name: setName}] })
            }

            const setDocRef = doc(collection(userDocRef, 'flashcardSets'), setName)
            batch.set(setDocRef, { flashcards })

            await batch.commit()

            alert('Flashcards saved successfully!')
            handleCloseDialog()
            setSetName('')
        } catch (error) {
            console.error('Error saving flashcards:', error)
            alert('An error occurred while saving flashcards. Please try again.')
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md">
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h6" sx={{
                            flexGrow: 1,
                            color: '#221b15',
                            }}>
                            Flashcard SaaS
                        </Typography>
                    </Toolbar>
                </AppBar>
                {/*Generate Flashcard Natassia Notes: Make it centered on the page*/}
                <Box sx={{ 
                    my: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'column', 
                    }}>
                    <Typography 
                    variant="h4" 
                    component="h1" 
                    gutterBottom
                    sx={{
                        textAlign: 'center',
                    }}>
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
                    sx={{ mb: 2, 
                        color: '#221b15',
                        backgroundImage: 'url(https://img.freepik.com/premium-photo/notebook-paper-background-lined-notebook-paper-crumpled-paper-background_322958-3948.jpg)',
                        
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
        </ThemeProvider>
    )
}

