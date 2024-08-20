import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8tw21M2X1sdBq8g9MpGwNVC53eyUQ6n0",
  authDomain: "clone-b24e2.firebaseapp.com",
  projectId: "clone-b24e2",
  storageBucket: "clone-b24e2.appspot.com",
  messagingSenderId: "224872020553",
  appId: "1:224872020553:web:b8a634188154b073a69d98",
  measurementId: "G-2KWLH8TF0M"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };


  