import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyCJMWn5UpHTVEKDE-gDpxVB4r91H6mUK8s",
    authDomain: "trimatch-b613b.firebaseapp.com",
    databaseURL: "https://trimatch-b613b.firebaseio.com",
    projectId: "trimatch-b613b",
    storageBucket: "trimatch-b613b.appspot.com",
    messagingSenderId: "441864222282",
    appId: "1:441864222282:web:27ef1fe7471aba8f3798b3",
    measurementId: "G-FRQPZDTHMK",
};
  
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };