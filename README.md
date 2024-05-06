# Trimatch
A web app written in React designed to bring people together within a high school, that developers attended.
The project has been independent of school and was created entirely for fun.

This application has been configured to be hosted and mantained on Google's Firebase, using Firestore Database and Cloud Functions as backend.
It consits of two subprojects - the form you can use to join the fun and administration panel that was designed to easily make pairs based on answers from the form written by participants.
Both applications work independently and simply use the same database.

``./panel`` - folder containing a web app that allows administration of the game  
``./form`` - folder containing a web app that allows participants to sign into the game  
``./mail`` - folder containing a frontend template of emails that are being sent to participants  
``./functions`` - folder containing a backend functions used in Cloud Firestore  
