import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDFGCKL7g5eQbr136j7A2SwbmAQLzD24o",
  authDomain: "evochat-56ff6.firebaseapp.com",
  projectId: "evochat-56ff6",
  storageBucket: "evochat-56ff6.appspot.com",
  messagingSenderId: "60009989182",
  appId: "1:60009989182:web:300df2e069090641097d6f",
  measurementId: "G-EFS0DZ7QRY",
};

export const auth = firebase.initializeApp(firebaseConfig).auth();
