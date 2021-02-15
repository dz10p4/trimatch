const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

exports.registerUser = functions.https.onCall((data, context) => {
  const name = data.name;
  const surname = data.surname;
  const profile = data.profile;
  const year = data.year;
  const email = data.email;
  const social = data.social;
  const answers = data.answers;

  const docRef = db
    .collection("users")
    .doc(name + "-" + surname + "-" + answers[0]);

  return docRef
    .set({
      name: name,
      surname: surname,
      profile: profile,
      year: year,
      email: email,
      social: social,
      answers: answers,
    })
    .then(() => {
      return `Document successfully written`;
    });
});
