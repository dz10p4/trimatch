import "./ListMatched.css";
import firebase from "firebase/app";
import "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "./Firebase.config.js";

var matchedRef = db.collection("matched");
var peopleRef = db.collection("users");



function ListMatched() {
  const [matchedCollection, setMatchedCollection] = useState({});
  useEffect(() => {
    matchedRef.get().then((querySnapshot) => {
      let documents = new Object();
      querySnapshot.docs.forEach((doc) => (documents[doc.id] = doc.data()));
      setMatchedCollection(documents);
    });
  }, [matchedCollection]);

  // const [person1, setPerson1] = useState({});
  // const [person2, setPerson2] = useState({});


  function cancelMatch(documentID) {
    const peopleIDs = documentID.split(":");
    const firPerson = peopleIDs[0];
    const secPerson = peopleIDs[1];

    peopleRef
      .doc(firPerson)
      .update({
        partners: firebase.firestore.FieldValue.arrayRemove(secPerson)//partners.filter((part) => part !== secPerson),
      });

    peopleRef
      .doc(secPerson)
      .update({
        partners: firebase.firestore.FieldValue.arrayRemove(firPerson)//partners.filter((part) => part !== firPerson),
      });

    peopleRef.doc(firPerson).get().then(doc => {
      const partnersArray = doc.data().partners;
      const isMatched = partnersArray.length === 0 ? false : true;
      peopleRef.doc(firPerson).update({
        matched: isMatched,
      });
    });

    peopleRef.doc(secPerson).get().then(doc => {
      const partnersArray = doc.data().partners;
      const isMatched = partnersArray.length === 0 ? false : true;
      peopleRef.doc(secPerson).update({
        matched: isMatched,
      });
    });

    peopleRef.doc(firPerson).get().then(doc => {
      const partnersArray = doc.data().partners;
      const isMatched = partnersArray.length === 0 ? false : true;
      peopleRef.doc(firPerson).update({
        matched: isMatched,
      });
    });
    matchedRef.doc(documentID).delete();
  }

  function confirmMatch(documentID) {
    const peopleIDs = documentID.split(":");
    const person1ID = peopleIDs[0];
    const person2ID = peopleIDs[1];
    console.log(person1ID);
    console.log(person2ID);
    let email1, email2, name1, name2, fullName1, fullName2, social1, social2;
    db.collection("users").doc(person1ID).get().then((doc) => {
      // setPerson1(doc.data());
      email1 = doc.data().email;
      // console.log(email1);
      name1 = doc.data().name;
      fullName1 = doc.data().fullName;
      social1 = doc.data().social;
      db.collection("users").doc(person2ID).get().then((doc) => {
        // setPerson2(doc.data());
        email2 = doc.data().email;
        // console.log(email2);
        name2 = doc.data().name;
        fullName2 = doc.data().fullName;
        social2 = doc.data().social;
        console.log(email1);
        console.log(email2);
        // wysłać maila do osoby 1
        db.collection("mail")
          .doc(documentID + '_1')
          .set({
            to: email1,
            message: {
              subject: "Twój wymarzony match",
              html: '<html lang="pl"><head><meta charset="UTF-8"></head><body style="margin: 0;"><div style="background: #fcd0d5; text-align: center; padding-top: 32px; padding-bottom: 32px; color: black; font-family: Arial, Helvetica, sans-serif;"><div style="background: white; margin-left: auto; margin-right: auto; max-width: 800px; border-radius: 20px; padding: 16px; margin-bottom: 16px;"><img src="https://trimatch.xyz/mail_logo.png" /></div><div style="background: white; margin-left: auto; margin-right: auto; max-width: 800px; border-radius: 20px; padding: 10px; margin-bottom: 16px;"><h2>Hej ' + name1 + '!</h2><p style="font-size: large;">Pora na ujawnienie Twojego wymarzonego matcha!</p><p style="font-size: large;">Osoba, do której pasujesz to:</p><p style="font-size: large;">' + fullName2 + '</p><p style="font-size: large;">Dane kontaktowe dopasowanej osoby:</p><p style="font-size: large;">' + social2 + '</p></div></div></body></html>',
            }
          });
        // wysłać maila do osoby 2
        db.collection("mail")
          .doc(documentID + '_2')
          .set({
            to: email2,
            message: {
              subject: "Twój wymarzony match",
              html: '<html lang="pl"><head><meta charset="UTF-8"></head><body style="margin: 0;"><div style="background: #fcd0d5; text-align: center; padding-top: 32px; padding-bottom: 32px; color: black; font-family: Arial, Helvetica, sans-serif;"><div style="background: white; margin-left: auto; margin-right: auto; max-width: 800px; border-radius: 20px; padding: 16px; margin-bottom: 16px;"><img src="https://trimatch.xyz/mail_logo.png" /></div><div style="background: white; margin-left: auto; margin-right: auto; max-width: 800px; border-radius: 20px; padding: 10px; margin-bottom: 16px;"><h2>Hej ' + name2 + '!</h2><p style="font-size: large;">Pora na ujawnienie Twojego wymarzonego matcha!</p><p style="font-size: large;">Osoba, do której pasujesz to:</p><p style="font-size: large;">' + fullName1 + '</p><p style="font-size: large;">Dane kontaktowe dopasowanej osoby:</p><p style="font-size: large;">' + social1 + '</p></div></div></body></html>',
            }
          });
        // zatwierdzić połączenie
        db.collection("matched").doc(documentID).set({ confirmed: true }, { merge: true });

        let newCollection = matchedCollection;
        delete newCollection[documentID];
        setMatchedCollection(newCollection);
      });
    });


  }

  return (
    <div className="list">
      <div className="person personHeader">
        <div className="value fperson">Pierwsza osoba</div>
        <div className="value sperson">Druga osoba</div>
        <div className="value points">Punktacja</div>
        <div className="value cancelbutton">Anuluj matcha</div>
        <div className="value confirmbutton">Potwierdź matcha</div>
      </div>
      {Object.entries(matchedCollection).map(([key, value]) => (
        <>
          <div key={key} className={value.confirmed ? "person person-disabled" : "person"}>
            <div className="value fperson">{value.fperson}</div>
            <div className="value sperson">{value.sperson}</div>
            <div className="value points">{value.points}</div>
            <div className="value cancelbutton">
              <span
                className={value.confirmed ? "clickablec clickable-disabled" : "clickablec"}
                onClick={value.confirmed ? null : () => cancelMatch(key)}
              >
                Anuluj
              </span>
            </div>
            <div className="value confirmbutton">
              <span
                className={value.confirmed ? "clickablep clickable-disabled" : "clickablep"}
                onClick={value.confirmed ? null : () => confirmMatch(key)}
              >
                Potwierdź
              </span>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
export default ListMatched;
