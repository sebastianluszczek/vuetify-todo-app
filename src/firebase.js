import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCCgF8_CtIZcDnjLTTy0jIL2LP0efSAfBE",
    authDomain: "todo-app-9adab.firebaseapp.com",
    databaseURL: "https://todo-app-9adab.firebaseio.com",
    projectId: "todo-app-9adab",
    storageBucket: "todo-app-9adab.appspot.com",
    messagingSenderId: "431089258747",
    appId: "1:431089258747:web:bb1930f9269f7379"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;