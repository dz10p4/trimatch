import "./ListMatched.css";
import firebase from "firebase/app";
import "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "./Firebase.config.js";

var peopleRef = db.collection("matched");
var testRef = db.collection("test");



function ListMatched() {
  const [peopleCollection, setPeopleCollection] = useState({});
  useEffect(() => {
    peopleRef.get().then((querySnapshot) => {
      let documents = new Object();
      querySnapshot.docs.forEach((doc) => (documents[doc.id] = doc.data()));
      setPeopleCollection(documents);
    });
  }, []);

  const [person1, setPerson1] = useState({});
  const [person2, setPerson2] = useState({});


  function cancelMatch(documentID) {
    const peopleIDs = documentID.split(":");
    const firperson = peopleIDs[0];
    const secperson = peopleIDs[1];

    peopleRef.doc(documentID).delete();

    testRef
      .doc(firperson)
      .update({
        partner: firebase.firestore.FieldValue.arrayRemove(secperson)//partner.filter((part) => part !== secperson),
      });

    testRef
      .doc(secperson)
      .update({
        partner: firebase.firestore.FieldValue.arrayRemove(firperson)//partner.filter((part) => part !== firperson),
      });

    testRef.doc(firperson).get().then(doc => {
      const partnerArray = doc.partner;
      testRef.doc(firperson).update({
        matched: partnerArray.length === 0 ? false : true,
      });
    });

    testRef.doc(secperson).get().then(doc => {
      const partnerArray = doc.partner;
      testRef.doc(secperson).update({
        matched: partnerArray.length === 0 ? false : true,
      });
    });

  }

  function confirmMatch(documentID) {
    const peopleIDs = documentID.split(":");
    const person1ID = peopleIDs[0];
    const person2ID = peopleIDs[1];
    db.collection("users").doc(person1ID).get().then((doc) => {
      setPerson1(doc.data());
    });
    db.collection("users").doc(person2ID).get().then((doc) => {
      setPerson2(doc.data());
    });
    console.log(person1);
    //documentID - id1:id2
    //fpersonID - id1
    //spersonID - id2

    // wysłać maila do osoby 1
    db.collection("mail")
      .add({
        to: person1.email,
        message: {
          subject: "Twój wymarzony match",
          html: '<html lang="pl"><head><meta charset="UTF-8"></head><body style="margin: 0;"><div style="background: #fcd0d5; text-align: center; padding-top: 32px; padding-bottom: 32px; color: black; font-family: Arial, Helvetica, sans-serif;"><div style="background: white; margin-left: auto; margin-right: auto; max-width: 800px; border-radius: 20px; padding: 16px; margin-bottom: 16px;"><img src="https://trimatch.date/mail_logo.png" /></div><div style="background: white; margin-left: auto; margin-right: auto; max-width: 800px; border-radius: 20px; padding: 10px; margin-bottom: 16px;"><h2>Hej ' + person1.name + '!</h2><p style="font-size: large;">Pora na ujawnienie Twojego wymarzonego matcha!</p><p style="font-size: large;">Osoba, do której pasujesz to:</p><p style="font-size: large;">' + person2.fullName + '</p><p style="font-size: large;">Dane kontaktowe dopasowanej osoby:</p><p style="font-size: large;">' + person2.social + '</p></div></div></body></html>',
        }
      })
      .then(() => console.log("Queued email for delivery!"));

    // wysłać maila do osoby 2
    db.collection("mail")
      .add({
        to: person2.email,
        message: {
          subject: "Twój wymarzony match",
          html: '<html lang="pl"><head><meta charset="UTF-8"></head><body style="margin: 0;"><div style="background: #fcd0d5; text-align: center; padding-top: 32px; padding-bottom: 32px; color: black; font-family: Arial, Helvetica, sans-serif;"><div style="background: white; margin-left: auto; margin-right: auto; max-width: 800px; border-radius: 20px; padding: 16px; margin-bottom: 16px;"><img src="https://trimatch.date/mail_logo.png" /></div><div style="background: white; margin-left: auto; margin-right: auto; max-width: 800px; border-radius: 20px; padding: 10px; margin-bottom: 16px;"><h2>Hej ' + person2.name + '!</h2><p style="font-size: large;">Pora na ujawnienie Twojego wymarzonego matcha!</p><p style="font-size: large;">Osoba, do której pasujesz to:</p><p style="font-size: large;">' + person1.fullName + '</p><p style="font-size: large;">Dane kontaktowe dopasowanej osoby:</p><p style="font-size: large;">' + person1.social + '</p></div></div></body></html>',
        }
      })
      .then(() => console.log("Queued email for delivery!"));

    // zatwierdzić połączenie
    db.collection("matched").doc(documentID).set( { confirmed: true }, { merge: true } );
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
      {Object.entries(peopleCollection).map(([key, value]) => (
        <>
          <div key={key} className="person">
            <div className="value fperson">{value.fperson}</div>
            <div className="value sperson">{value.sperson}</div>
            <div className="value points">{value.points}</div>
            <div className="value cancelbutton">
              <span className="clickablec" onClick={() => cancelMatch(key)}>
                Anuluj
              </span>
            </div>
            <div className="value confirmbutton">
              <span className="clickablep" onClick={() => confirmMatch(key)}>
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
