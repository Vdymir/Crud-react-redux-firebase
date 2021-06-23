import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBhoEJkKLazS0UH2poBlNDDLKXmbmsIAaY",
    authDomain: "crud-react-firebase-c4d72.firebaseapp.com",
    projectId: "crud-react-firebase-c4d72",
    storageBucket: "crud-react-firebase-c4d72.appspot.com",
    messagingSenderId: "1013536420098",
    appId: "1:1013536420098:web:4f83aa8d1d496c44fd921b",
    measurementId: "G-XLM5RVQ577"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
    

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  

  export {
      db,
      googleAuthProvider,
      firebase
  }