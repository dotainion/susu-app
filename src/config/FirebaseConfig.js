import firebase from 'firebase';


const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAXC1nnSRmGv2OeKldUj026Xdy8zaFOQ54",
    authDomain: "susu-app-f86b6.firebaseapp.com",
    projectId: "susu-app-f86b6",
    storageBucket: "susu-app-f86b6.appspot.com",
    messagingSenderId: "584964030441",
    appId: "1:584964030441:web:498f07e82ddf47b68a9578",
    measurementId: "G-KWD1EHQ7MB"
};

const app = firebase.initializeApp(FIREBASE_CONFIG);
export const db = app.firestore();
export const auth = app.auth();

