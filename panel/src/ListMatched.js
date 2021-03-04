import "./ListMatched.css"
import firebase from "firebase/app";
import "firebase/firestore";
import { useState , useEffect } from "react";
import { db } from "./Firebase.config.js";

//const db = firebase.firestore();

var peopleRef = db.collection("matched");

function ListMatched() {

    const [peopleCollection, setPeopleCollection] = useState({});

    useEffect(() => {
        peopleRef.get().then(querySnapshot => {
            let documents = new Object();
            querySnapshot.docs.forEach(doc => documents[doc.id] = doc.data());
            setPeopleCollection(documents);
        });
    },[]);

	function cancelMatch() {

	}

    return (
		<div className="list">
			<div
				className="person personHeader"
			>
				<div className="value fperson">Pierwsza osoba</div>
				<div className="value sperson">Druga osoba</div>
				<div className="value points">Punktacja</div>
				<div className="value cancelbutton">Anuluj matcha</div>
				
			</div>
			{Object.entries(peopleCollection).map(([key, value]) => (
				<>
					<div
						// key={key}
						className="person"
					>
						<div className="value fperson">{value.fperson}</div>
						<div className="value sperson">{value.sperson}</div>
						<div className="value points">{value.points}</div>
						<div className="value cancelbutton"><span className="clickable" onClick={cancelMatch}>Anuluj</span></div>
						
					</div>
				</>
			))}
		</div>
	);






}
export default ListMatched;