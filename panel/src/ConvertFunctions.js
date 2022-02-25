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
				let fromTrójka = true;
				if (person.data().profile == "spoza Trójki")
					fromTrójka = false;
				db.collection("users").doc(person.id).set({ fullName: person.data().name.trim() + " " + person.data().surname.trim(), gender: gender, lookingFor: lookingFor, matched: false, partners: [], isFromTrójka: fromTrójka }, { merge: true });
			});
		});
	}

	function countPoints() {
		db.collection("users").get().then(function (querySnapshot) {
			querySnapshot.forEach((person) => {
				const pointsTab = {};
				db.collection("users").get().then(function (querySnapshot) {
					querySnapshot.forEach((partner) => {
						if (person.id != partner.id) {
							if (person.data().lookingFor[partner.data().gender] && partner.data().lookingFor[person.data().gender]) {
								let points = 0;
								// liczenie punktów
								// - nie ta sama klasa +6
								if (person.data().year != partner.data().year || person.data().profile != partner.data().profile || !person.data().isFromTrójka || !partner.data().isFromTrójka) {
									points += 6;
								}
								// - ten sam profil +2
								if (person.data().profile == partner.data().profile) {
									points += 2;
								}
								// priorytet +4 [2]
								if (person.data().answers[2] == partner.data().answers[2]) {
									points += 4;
								}
								// wymarzona randka +3 [3]
								if (person.data().answers[3] == partner.data().answers[3]) {
									points += 3;
								}
								// w towarzystwie rówieśników +3 [4]
								if (person.data().answers[4] == partner.data().answers[4]) {
									points += 3;
								}
								// czas wolny +2 [5]
								if (person.data().answers[5] == partner.data().answers[5]) {
									points += 2;
								}
								pointsTab[partner.id] = points;
							}
							else {
								pointsTab[partner.id] = -1;
							}
						}
						else {
							pointsTab[partner.id] = -1;
						}
					});
					db.collection("users").doc(person.id).set({ points: pointsTab }, { merge: true });
				});
			});
		});
	}
	
	return (
		<button onClick={convertData()}>convertData</button>
	);
}

export default ConvertFunctions;