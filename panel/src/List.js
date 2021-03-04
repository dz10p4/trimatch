import "./List.css"
import firebase from "firebase/app";
// import "firebase/auth";
import "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "./Firebase.config.js";

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

//firebase.initializeApp(firebaseConfig);

//const db = firebase.firestore();

var peopleRef = db.collection("users");



function List() {

	
	const [peopleCollection, setPeopleCollection] = useState({});

    useEffect(() => {
        peopleRef.get().then(querySnapshot => {
            let documents = new Object();
            querySnapshot.docs.forEach(doc => documents[doc.id] = doc.data());
            setPeopleCollection(documents);
            // setpeople(documents);
        });
    }, []);

	
	return (
		<div className="list">
			<div
				className="person personHeader"
			>
				<div className="value name">imię i nazwisko</div>
				<div className="value year">rocznik</div>
				<div className="value profile">profil</div>
				<div className="value gender">płeć</div>
				<div className="value lookingFor">kogo szuka</div>
				<div className="value email">email</div>
				<div className="value social">social media</div>
			</div>
			{Object.entries(peopleCollection).map(([key, value]) => (
				<>
					<div
						// key={key}
						className="person"
					>
						<div className="value name">{value.fullName}</div>
						<div className="value year">{value.year}</div>
						<div className="value profile">{value.profile}</div>
						<div className="value gender">{value.gender}</div>
						<div className="value lookingFor">{value.answers[1]}</div>
						<div className="value email">{value.email}</div>
						<div className="value social">{value.social}</div>
					</div>
				</>
			))}
		</div>
	);
}

export default List;