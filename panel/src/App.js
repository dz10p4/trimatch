import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useState, useEffect } from "react";

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

var peopleRef = db.collection("users");

function App() {
  const [matchedNames, setMatchedNames] = useState([]);
  const [peopleCollection, setPeopleCollection] = useState({});
  const [currentLeftPerson, setCurrentLeftPerson] = useState('');
  const [currentRightPerson, setCurrentRightPerson] = useState('');

  function match() {}

  function choosePerson(documentID) {
    const personDocument = peopleCollection[documentID];
    const personsPoints = Object.entries(personDocument.points);
    const filteredPersons = personsPoints.filter(person => person[1] !== -1);
    const sortedPersons = filteredPersons.sort((a, b) => b[1] - a[1]);
    setMatchedNames(sortedPersons);
    setCurrentLeftPerson(documentID);
    setCurrentRightPerson('');
  }

  function chooseMatch(documentID) {
    setCurrentRightPerson(documentID);
  }

  const [listOne, setListOne] = useState([]);

  useEffect(() => {
    peopleRef.get().then(querySnapshot => {
      let documents = new Object();
      querySnapshot.docs.forEach(doc => documents[doc.id] = doc.data());
      setPeopleCollection(documents);
      setListOne(documents);
    });
  }, []);

  return (
    <div className="main-layout">
      <div className="logod">
        <img src="logo.png" width="100px" height="100px" />
      </div>
      
      <div className="cselect">
        <select name="selector" className="selector">
          <optgroup label="Listy:">
            <option id="s1">
              Wszystkie osoby wpisane z odpowiedziami na pytania
            </option>
            <option id="s2">Osoby dobrane</option>
            <option id="s3">Wysyłanie dobranych osób</option>
          </optgroup>
          <optgroup label="Dobieranie:">
            <option id="s4">Dobieraj</option>
          </optgroup>
        </select>
      </div>

      <div className="l-column">
        {Object.entries(listOne).map(([key, value]) => (
          <>
            {" "}
            <span
              key={key}
              className="listedp"
              onClick={() => choosePerson(key)}
            >
              {value.fullName}
            </span>
            <hr />{" "}
          </>
        ))}
      </div>

      <div className="openqp1">
        {currentLeftPerson !== '' &&
          <>
            <p>Ulubiony gatunek muzyki:</p>
            <p>{peopleCollection[currentLeftPerson].answers[7]}</p>
            <br/>
            <p>Ulubiony film:</p>
            <p>{peopleCollection[currentLeftPerson].answers[8]}</p>
          </>
        } 
      </div>

      <div className="f-person">
        <span className="onatopp1">
          <span className="fpc">{currentLeftPerson === '' ? 'Pierwsza osoba' : peopleCollection[currentLeftPerson].fullName}</span>
        </span>
      </div>

      <div className="cbutton">
        <span className="confbut" onClick={match}>
          POTWIERDŹ
        </span>
      </div>

      <div className="s-person">
        <span className="onatopp2">
          <span className="spc">{currentRightPerson === '' ? 'Druga osoba' : peopleCollection[currentRightPerson].fullName}</span>
        </span>
      </div>

      <div className="openqp2">
        {currentRightPerson !== '' &&
          <>
            <p>Ulubiony gatunek muzyki:</p>
            <p>{peopleCollection[currentRightPerson].answers[7]}</p>
            <br/>
            <p>Ulubiony film:</p>
            <p>{peopleCollection[currentRightPerson].answers[8]}</p>
          </>
        } 
      </div>

      <div className="r-column">
        {matchedNames.map(([key, points]) => (
          <>
            {" "}
            <span
              key={key}
              className="listedp"
              onClick={() => chooseMatch(key)}
            >
              {`${peopleCollection[key].fullName} ${points}`}
            </span>
            <hr />{" "}
          </>
        ))}
      </div>
    </div>
  );
}

export default App;
