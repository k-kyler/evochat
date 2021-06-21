import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCDFGCKL7g5eQbr136j7A2SwbmAQLzD24o",
  authDomain: "evochat-56ff6.firebaseapp.com",
  projectId: "evochat-56ff6",
  storageBucket: "evochat-56ff6.appspot.com",
  messagingSenderId: "60009989182",
  appId: "1:60009989182:web:300df2e069090641097d6f",
  measurementId: "G-EFS0DZ7QRY",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

export { auth, googleAuthProvider, facebookAuthProvider };
export default db;
