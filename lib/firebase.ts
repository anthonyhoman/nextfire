import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAm6AN0I2i00wsK9647x6tTNDxcvSSSg5A",
    authDomain: "nextfire-ah.firebaseapp.com",
    projectId: "nextfire-ah",
    storageBucket: "nextfire-ah.appspot.com",
    messagingSenderId: "1065663853030",
    appId: "1:1065663853030:web:e3021c6b83ae041582e627"
}

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();