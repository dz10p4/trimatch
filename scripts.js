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
const name = document.querySelector("#name");
const surname = document.querySelector("#surname");
const classSelect = document.querySelector("#classes");
const email = document.querySelector("#email");
const street = document.querySelector("#street");
const number = document.querySelector("#number");
const city = document.querySelector("#city");
const postalCode = document.querySelector("#postal-code");
const consentCheckbox = document.querySelector("#consent");
const submitButton = document.querySelector("#submit-button");

function addDocument() {
  collRef
    .doc(classSelect.value + " " + name.value + " " + surname.value)
    .set({
      firstName: name.value,
      lastName: surname.value,
      class: classSelect.value,
      email: email.value,
      street: street.value,
      streetNumber: number.value,
      city: city.value,
      postalCode: postalCode.value,
    })
    .then(() => {
      console.log("Saved!");
      const formDiv = document.querySelector(".form");
      formDiv.style.setProperty("display", "initial");
      formDiv.innerHTML = '<p class="message">Dziękujemy za zapisanie się do zabawy!</p><p class="message">Nie zapomnij wysłać zdjęcia kartki na <a href="mailto:trimatch@trimatch.date">trimatch@trimatch.date</a>!</p>';
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (consentCheckbox.checked && !!name.value && !!surname.value && !!classSelect.value && !!email.value && !!street.value && !!number.value && !!city.value && !!postalCode.value)
    addDocument();
  else
    document.querySelector(".message-small").innerHTML = "<p>Wpisz wszystkie dane, a potem się zarejestruj.</p>";
});

function updateStyle() {
  if (classSelect.value != "") {
    classSelect.classList.remove("disabledSelect");
  }
}
