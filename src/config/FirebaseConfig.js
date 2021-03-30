import firebase from 'firebase';


const FIREBASE_CONFIG = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

const app = firebase.initializeApp(FIREBASE_CONFIG);
export const db = app.firestore();
export const auth = app.auth();

