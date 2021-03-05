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
    const person1 = db.collection("users").doc(person1ID).data();
    const person2 = db.collection("users").doc(person2ID).data();
    
    //documentID - id1:id2
    //fpersonID - id1
    //spersonID - id2

    // wysłać maila do osoby 1
    db.collection(/* "mail" */"mail-test").add( {
      to: [person1.email],
      message: {
        subject: "Twój wymarzony match",
        html: '<html lang="pl"><head><meta charset="UTF-8"></head><body style="margin: 0;"><div style="background: #fcd0d5; text-align: center; padding-top: 32px; padding-bottom: 32px; color: black; font-family: Arial, Helvetica, sans-serif;"><div style="background: white; margin-left: auto; margin-right: auto; max-width: 800px; border-radius: 20px; padding: 16px; margin-bottom: 16px;"><img src="data:image/png;base64,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" /></div><div style="background: white; margin-left: auto; margin-right: auto; max-width: 800px; border-radius: 20px; padding: 10px; margin-bottom: 16px;"><h2>Hej ' + person1.name + '!</h2><p style="font-size: large;">Pora na ujawnienie Twojego wymarzonego matcha!</p><p style="font-size: large;">Osoba, do której pasujesz to:</p><p style="font-size: large;">' + person2.fullName + '</p><p style="font-size: large;">Dane kontaktowe dopasowanej osoby:</p><p style="font-size: large;">' + person2.social + '</p></div></div></body></html>'
      }
    })

    // wysłać maila do osoby 2
    db.collection(/* "mail" */"mail-test").add( {
      to: [person2.email],
      message: {
        subject: "Twój wymarzony match",
        html: '<html lang="pl"><head><meta charset="UTF-8"></head><body style="margin: 0;"><div style="background: #fcd0d5; text-align: center; padding-top: 32px; padding-bottom: 32px; color: black; font-family: Arial, Helvetica, sans-serif;"><div style="background: white; margin-left: auto; margin-right: auto; max-width: 800px; border-radius: 20px; padding: 16px; margin-bottom: 16px;"><img src="data:image/png;base64,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" /></div><div style="background: white; margin-left: auto; margin-right: auto; max-width: 800px; border-radius: 20px; padding: 10px; margin-bottom: 16px;"><h2>Hej ' + person2.name + '!</h2><p style="font-size: large;">Pora na ujawnienie Twojego wymarzonego matcha!</p><p style="font-size: large;">Osoba, do której pasujesz to:</p><p style="font-size: large;">' + person1.fullName + '</p><p style="font-size: large;">Dane kontaktowe dopasowanej osoby:</p><p style="font-size: large;">' + person1.social + '</p></div></div></body></html>'
      }
    })

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
