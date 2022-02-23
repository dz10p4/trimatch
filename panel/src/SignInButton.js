import React from "react";
import firebase from 'firebase/app';
import 'firebase/auth';
import './SignInButton.css'
const SignIn = ()=>{

    const SignInWithFirebase = () =>{
        var google_provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(google_provider)
        .then((re)=>{
            console.log(re);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div className="loginbutton" onClick={SignInWithFirebase}>ZALOGUJ</div>
    )



}
export default SignIn