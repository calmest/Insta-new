/* eslint-disable prettier/prettier */
import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// import { seedDatabase } from '../seed';

const config = {
    apiKey: 'AIzaSyCAWqjpFdvEJEb3UKoguPn6Cd6WHm6yGTw',
    authDomain: 'instagram-73740.firebaseapp.com',
    projectId: 'instagram-73740',
    storageBucket: 'instagram-73740.appspot.com',
    messagingSenderId: '700382241933',
    appId: '1:700382241933:web:021e30f69af30158576ec4'
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// seedDatabase(firebase);

export { firebase, FieldValue };