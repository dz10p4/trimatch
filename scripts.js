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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

const collRef = firestore.collection("people");
const name = document.querySelector("#name").value;
const surname = document.querySelector("#surname").value;
const classSelect = document.querySelector("#classes");
const email = document.querySelector("#email").value;
const street = document.querySelector("#street").value;
const number = document.querySelector("#number").value;
const city = document.querySelector("#city").value;
const postalCode = document.querySelector("#postal-code").value;
const submitButton = document.querySelector("#submit-button");

function addDocument() {
  collRef
    .doc(classSelect.value + " " + name + " " + surname)
    .set({
      firstName: name,
      lastName: surname,
      class: classSelect.value,
      email: email,
      street: street,
      streetNumber: number,
      city: city,
      postalCode: postalCode,
    })
    .then(() => {
      console.log("Saved!");
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  addDocument();
});

function updateStyle() {
  if (classSelect.value != "") {
    classSelect.classList.remove("disabledSelect");
  }
}
