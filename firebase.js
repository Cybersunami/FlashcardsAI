// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirebase} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZmSH5OpWClYc7eADRVBpkwj5TX3oVQZQ",
  authDomain: "fir-ai-86b56.firebaseapp.com",
  projectId: "fir-ai-86b56",
  storageBucket: "fir-ai-86b56.appspot.com",
  messagingSenderId: "733313487425",
  appId: "1:733313487425:web:df51d5f4d731cdecaeecc0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app)
const db = getFirebase(app)

export {db}