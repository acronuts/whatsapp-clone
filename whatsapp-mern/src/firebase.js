import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCYceZ6CMjU65Cl2dEjv5MGXBMwpDCRij8",
    authDomain: "whats-clone-4973f.firebaseapp.com",
    projectId: "whats-clone-4973f",
    storageBucket: "whats-clone-4973f.appspot.com",
    messagingSenderId: "120817766644",
    appId: "1:120817766644:web:c0fa1d89bcd0302dbc8ea1"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };