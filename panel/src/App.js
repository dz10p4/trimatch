import Match from './Match';
import List from "./List";
import Navbar from './Navbar';
import './App.css';
import { useState } from 'react';
import ListMatched from './ListMatched';



function App() {

    

    const [currentSelection, setCurrentSelection] = useState("1");

    const handleSelect = event => {
        setCurrentSelection(event.target.value);
    };

    return (
        <>
            <Navbar handlerFunction={handleSelect} currentState={currentSelection} />
            {currentSelection === "1" && <List />}
            {currentSelection === "4" && <Match />}
            {currentSelection === "2" && <ListMatched />}
        </>
    );
}

export default App;
