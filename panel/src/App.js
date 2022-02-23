import Match from './Match';
import List from "./List";
import Navbar from './Navbar';
import SignInButton from './SignInButton'
import './App.css';
import { useEffect, useState } from 'react';
import ListMatched from './ListMatched';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';




function App() {
    
    const [currentSelection, setCurrentSelection] = useState("1");
    const [isSignedIn,setIsSignedIn] = useState(true);

    firebase.auth().onAuthStateChanged((user)=>{
        if(user){ 
           return setIsSignedIn(true);
        }
        setIsSignedIn(false);
    })

   

    const handleSelect = event => {
        setCurrentSelection(event.target.value);
        if(event.target.value === "3") {
            firebase.auth().signOut();
            setCurrentSelection("1");
        }
    };

    if(isSignedIn) {
        return (
            <>
                <Navbar handlerFunction={handleSelect} currentState={currentSelection} />
                {currentSelection === "1" && <List />}
                {currentSelection === "4" && <Match />}
                {currentSelection === "2" && <ListMatched />}
            </>
        );
    }
    else {
        return (
            <SignInButton/>
        );
    }

}

export default App;
