import "./List.css"
import firebase from "firebase/app";
import "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "./Firebase.config.js";

// var peopleRef = db.collection("users");

function ConvertFunctions() {

	function convertData() {
		db.collection("users").get().then((querySnapshot) => {
			querySnapshot.forEach((person) => {
				let gender;
				switch (person.data().answers[0]) {
					case 1:
						gender = "female";
						break;
					case 2:
						gender = "male";
						break;
					case 3:
						gender = "nonbinary";
						break;
				}
				const lookingFor = {
					male: false,
					female: false,
					nonbinary: false
				};
				switch (person.data().answers[1]) {
					case 1:
						lookingFor.male = true;
						break;
					case 2:
						lookingFor.female = true;
						break;
					case 3:
						lookingFor.male = true;
						lookingFor.female = true;
						lookingFor.nonbinary = true;
						break;
				}
				db.collection("users").doc(person.id).set({ fullName: person.data().name.trim() + " " + person.data().surname.trim(), gender: gender, lookingFor: lookingFor, matched: false, partners: [] }, { merge: true });
			});
		});
	}
	
	return (
		<button onClick={convertData()}>convertData</button>
	);
}

export default ConvertFunctions;