// responsible for fetching and displaying all of user's saved flashcard sets

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])

    const router = useRouter()

    // fetches user's flashcard sets when the component mounts or when the user changes
    // retrieves user's flashcard collections. if user does not exist, creates one with an empty flashcard array
    useEffect(() => {
        async function getFlashcards() {
          if (!user) return
          const docRef = doc(collection(db, 'users'), user.id)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || []
            setFlashcards(collections)
          } else {
            await setDoc(docRef, { flashcards: [] })
          }
        }
        getFlashcards()
      }, [user])

    
  
      // navigates to individual flashcard sets when user clicks on a set
      const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
      }

}