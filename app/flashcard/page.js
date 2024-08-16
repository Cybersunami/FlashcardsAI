'use client'
import {useUser} from "@clerk/next.js"

import { collection, doc, getDoc, getDocs} from 'firebase/firestore'
import {db} from '@/firebase'
import {useSearchParams} from 'next/navigation'

export default function Flashcard() {
    const { isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState({})

    const searchParams = useSearchParams()
    const search = searchParams.get('id')

    useEffect(() => {
        // retrieves all flashcards in the specified set from Firestore and updated the 'flashcards' state
        async function getFlashcard() {
          if (!search || !user) return
      
          const colRef = collection(doc(collection(db, 'users'), user.id), search)
          const docs = await getDocs(colRef)
          const flashcards = []
          docs.forEach((doc) => {
            flashcards.push({ id: doc.id, ...doc.data() })
          })
          setFlashcards(flashcards)
        }
        getFlashcard()
      }, [search, user])

      const handleCardClick = (id) => {
        setFlipped((prev) => ({
          ...prev,
          [id]: !prev[id],
        }))
      }

    
}