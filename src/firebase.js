import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCpoP7LXY5PLUAgdZVbjpkLDpdMaV28WOw",
    authDomain: "whats-app-clone-cf9b7.firebaseapp.com",
    projectId: "whats-app-clone-cf9b7",
    storageBucket: "whats-app-clone-cf9b7.appspot.com",
    messagingSenderId: "149618009648",
    appId: "1:149618009648:web:e2797e631915f10ddd2ff5",
    measurementId: "G-9QC25THNKJ"
};

const firebaseApp  = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();; 


export {auth, provider};
export default db;