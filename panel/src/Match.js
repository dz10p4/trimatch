import "./Match.css";
import firebase from "firebase/app";
// import "firebase/auth";
import "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "./Firebase.config.js";


var peopleRef = db.collection("users");
var matchedPeopleRef = db.collection("matched");

function Match() {
  const [matchedNames, setMatchedNames] = useState([]);
  const [peopleCollection, setPeopleCollection] = useState({});
  const [currentLeftPerson, setCurrentLeftPerson] = useState('');
  const [currentRightPerson, setCurrentRightPerson] = useState('');

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
  useEffect(() => {
    peopleRef.get().then(querySnapshot => {
      let documents = new Object();
      querySnapshot.docs.forEach(doc => documents[doc.id] = doc.data());
      setPeopleCollection(documents);
      setListOne(documents);
    });
  }, []);


  const [listOne, setListOne] = useState([]);

  const questions = [
    {
      type: "1",
      name: "Płeć:",
      answers: ["Kobieta", "Mężczyzna", "Osoba niebinarna"],
    },
    {
      type: "1",
      name: "Szukasz:",
      answers: [
        "Chłopaka",
        "Dziewczyny",
        "Związku (płeć nie ma znaczenia)",
      ],
    },
    {
      type: "1",
      name: "Co jest dla ciebie priorytetem w związku?",
      answers: [
        "wolność",
        "wierność",
        "wzajemne wsparcie",
        "dobra zabawa",
      ],
    },
    {
      type: "1",
      name: "Twoja wymarzona randka:",
      answers: [
        "Kolacja przy świecach",
        "Wieczór z dobrym filmem i pizzą",
        "Piknik w parku",
        "Wielogodzinny spacer",
        "Kreatywna i pełna niespodzianek"
      ],
    },
    {
      type: "1",
      name: "Jak odnajdujesz się w towarzystwie rówieśników?",
      answers: [
        "Staram się poznać jak najwięcej ludzi",
        "Trzymam się stałego grona",
        "Obydwa po trochu"
      ],
    },
    {
      type: "1",
      name: "Jak głównie spędzasz czas poza szkołą?",
      answers: [
        "trenuję sport",
        "czytam książki",
        "spędzam czas ze znajomymi",
        "rozwijam swoje hobby",
        "oglądam filmy i seriale",
      ],
    },
    {
      type: "3",
      name: "Co byś zabrał na bezludną wyspę?",

    },

  ];

  function questionAndAnswerToText(question, answer) {
    return questions[question].answers[answer];
  }

  function match() {
    peopleCollection[currentLeftPerson].matched = true;
    peopleCollection[currentRightPerson].matched = true;
    peopleCollection[currentLeftPerson].partners.push(currentRightPerson);
    peopleCollection[currentRightPerson].partners.push(currentLeftPerson);
    db.collection("matched")
      .doc(
        `${currentLeftPerson}:${currentRightPerson}`
      )
      .set(
        {
          fperson: peopleCollection[currentLeftPerson].fullName,
          sperson: peopleCollection[currentRightPerson].fullName,
          points:
            peopleCollection[currentLeftPerson].points[currentRightPerson],
          confirmed: false
        },
        { merge: true }
      );

    db.collection("users").doc(currentLeftPerson).set(
      {
        matched: true,
        partners: firebase.firestore.FieldValue.arrayUnion(currentRightPerson)
      },
      { merge: true }
    );

    db.collection("users").doc(currentRightPerson).set(
      {
        matched: true,
        partners: firebase.firestore.FieldValue.arrayUnion(currentLeftPerson)
      },
      { merge: true }
    );
    setCurrentLeftPerson('');
    setCurrentRightPerson('');
  }

  return (
    <div className="main-layout">
      <div className="l-column">
        {Object.entries(listOne).map(([key, value]) => (
          <>
            {" "}
            <div
              key={key}
              className={value.matched ? "listedp matched" : "listedp"}
              onClick={() => choosePerson(key)}
            >
              {value.fullName}
            </div>
            <hr />{" "}
          </>
        ))}
      </div>

      <div className="openqp1">
        {currentLeftPerson !== "" && (
          <>
            <p>Priorytet w związku:</p>
            <p>{questionAndAnswerToText(2, peopleCollection[currentLeftPerson].answers[2] - 1)}</p>
            <p>Wymarzona randka:</p>
            <p>{questionAndAnswerToText(3, peopleCollection[currentLeftPerson].answers[3] - 1)}</p>
            <p>Towarzystwo:</p>
            <p>{questionAndAnswerToText(4, peopleCollection[currentLeftPerson].answers[4] - 1)}</p>
            <p>Czas wolny:</p>
            <p>{questionAndAnswerToText(5, peopleCollection[currentLeftPerson].answers[5] - 1)}</p>
            <p>Co by zabrała na bezludną wyspę:</p>
            <p>{peopleCollection[currentLeftPerson].answers[6]}</p>
          </>
        )}
      </div>

      <div className="f-person">
        <div className="onatopp1">
          <div className="fpc">
            {currentLeftPerson === ''
              ? "Pierwsza osoba"
              : peopleCollection[currentLeftPerson].fullName}
          </div>
        </div>
      </div>

      <div className="cbutton">
        <div className="confbut" onClick={match}>
          POTWIERDŹ
        </div>
      </div>

      <div className="s-person">
        <div className="onatopp2">
          <span className="spc">
            {currentRightPerson === ""
              ? "Druga osoba"
              : peopleCollection[currentRightPerson].fullName}
          </span>
        </div>
      </div>

      <div className="openqp2">
        {currentRightPerson !== "" && (
          <>
            <p>Priorytet w związku:</p>
            <p>{questionAndAnswerToText(2, peopleCollection[currentRightPerson].answers[2] - 1)}</p>
            <p>Wymarzona randka:</p>
            <p>{questionAndAnswerToText(3, peopleCollection[currentRightPerson].answers[3] - 1)}</p>
            <p>Towarzystwo:</p>
            <p>{questionAndAnswerToText(4, peopleCollection[currentRightPerson].answers[4] - 1)}</p>
            <p>Czas wolny:</p>
            <p>{questionAndAnswerToText(5, peopleCollection[currentRightPerson].answers[5] - 1)}</p>
            <p>Co by zabrała na bezludną wyspę:</p>
            <p>{peopleCollection[currentRightPerson].answers[6]}</p>
          </>
        )}
      </div>

      <div className="r-column">
        {matchedNames.map(([key, points]) => (
          <>
            {" "}
            <div
              key={key}
              className=
              {peopleCollection[key].matched ? "listedp matched" : "listedp"}

              onClick={() => chooseMatch(key)}
            >
              {`${peopleCollection[key].fullName} ${points}`}
            </div>
            <hr />{" "}
          </>
        ))}
      </div>
    </div>
  );
}

export default Match;
