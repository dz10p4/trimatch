import React from "react";
import firebase from 'firebase/app';
import 'firebase/auth';
import './SignInButton.css'
const SignOut = ()=>{

    const SignOutFromPanel = () =>{
        firebase.auth().signOut();
    }

    return (
        <div className="logoutbutton" onClick={SignOutFromPanel}>WYLOGUJ</div>
    )

}
export default SignOut