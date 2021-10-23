import "./App.css";
import { useState, useEffect, useRef } from "react";
import firebase from "firebase/app";
import "firebase/functions";
import "firebase/firestore";
import TextField from "./Fields/TextField";
import ListSelector from "./Fields/ListSelector";
import PrimaryButton from "./Buttons/PrimaryButton";
import { ReactComponent as Logo } from "./Logo.svg";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import lottie from "lottie-web";
import Question from "./Questions/Question";
import RegistrationSuccessful from "./RegistrationSuccessful";

const firebaseConfig = {
  apiKey: "AIzaSyDhgu9WE-J7P9oqHm6N6ksl0fl4zFx8RNg",
  authDomain: "stumatch-12d25.firebaseapp.com",
  projectId: "stumatch-12d25",
  storageBucket: "stumatch-12d25.appspot.com",
  messagingSenderId: "515557187634",
  appId: "1:515557187634:web:74e20bd7a451853d241c2b",
  measurementId: "G-RVCD3B89MD"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

function App() {
  const [isFilled, setIsFilled] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [answers, setAnswers] = useState({});
  const profiles = [
    "biol-chem-mat",
    "biol-chem",
    "mat-geo",
    "human",
    "mat-fiz",
    "mat-inf",
    "mat-pol/IB"
  ];
  const years = ["1", "2", "3 po podst", "3 po gimnazjum"];
  const questions = [
    
  ];
  const questionCount = questions.length;

  const [email, setEmail] = useState("");
  const [rocznik, setRocznik] = useState("Rocznik");
  const [profil, setProfil] = useState("Profil");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [socialmedia, setSocialmedia] = useState("");
  const [height, setHeight] = useState("");

  function saveForm() {
    if(rocznik=='3 po gimnazjum')var rocznikw=32;
    else if(rocznik=='3 po podst')var rocznikw=31;
    else rocznikw=rocznik;

    db.collection("people").doc(name+"-"+surname).set({
      name: name,
      surname: surname,
      year: rocznikw,
      email: email,
      gender: currentAnswer,
      height: height
      
  },{merge: true});
    setIsFilled(false);
    setIsAnimated(true);
    setTimeout(() => {
      lottie.loadAnimation({
        container: lottieContainer.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: require("./assets/success.json"),
      });
    }, 500);

    setTimeout(() => {
      setIsRegistered(true);
    }, 2000);
  }

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 767;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const lottieContainer = useRef(null);

  function submitQuestion() {
    



    if (questions[currentQuestion].type === "1") {
      const ans = questions[currentQuestion].answers[currentAnswer];
      setCurrentAnswer(ans);
      console.log(currentAnswer);
    }
    setAnswers({ ...answers, [currentQuestion]: currentAnswer });
    setCurrentAnswer("");
    setCurrentQuestion(currentQuestion + 1);
    setIsFilled(false);
  }

  useEffect(() => {
    if (currentQuestion === questionCount) {
    //   const saveData = firebase.functions().httpsCallable("registerUser");
    //   saveData({
    //     name: name,
    //     surname: surname,
    //     profile: profil,
    //     year: rocznik,
    //     email: email,
    //     social: socialmedia,
    //     answers: answers,
    //   })
    //     .then((res) => {
    //       console.log(res.data);
    //     })
    //     .catch((err) => {
    //       console.log(err.data);
    //     });
    // }
   
}

  }, [currentQuestion]);

  useEffect(() => {
    if (
      email != "" &&
      rocznik != "Rocznik" &&
      name != "" &&
      surname != "" &&
      height != "" &&
      currentAnswer != null
    )
      setIsFilled(true);
  }, [email, rocznik, name, surname, height, currentAnswer]);

  // useEffect(() => {
  //   if (currentAnswer) setIsFilled(true);
  // }, [currentAnswer]);

  return (
    <div className="App">
      {width > breakpoint ? <Logo className="big-logo" /> : <Navbar />}
      <div className="form-section">
        {isRegistered ? (
          currentQuestion < questionCount ? (
            <>
              <Question
                type={questions[currentQuestion].type}
                name={questions[currentQuestion].name}
                answers={questions[currentQuestion].answers}
                setAnswer={setCurrentAnswer}
                currentAnswer={currentAnswer}
                currentQuestion={currentQuestion}
              />
              <PrimaryButton
                clickAction={submitQuestion}
                name={
                  currentQuestion === 2 ? "Podsumowanie" : "Następne pytanie"
                }
                isActive={isFilled}
              />
            </>
          ) : (
            <RegistrationSuccessful />
          )
        ) : (
          <>
            { <motion.div
              className="lottie-container"
              ref={lottieContainer}
              animate={isAnimated ? { opacity: 0 } : { opacity: 1 }}
              transition={{ delay: 1.5 }}
            /> }
            {/*<p className="message">Zapisy zakończone. Dziękujemy wszystkim za wpisanie się.</p>*/}
            { <motion.div
              className="text-fields"
              animate={
                isAnimated ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }
              }
            >
              <div className="double-text-field">
                <TextField
                  type="text"
                  placeholder="Imię"
                  value={name}
                  setValue={setName}
                />
                <TextField
                  type="text"
                  placeholder="Nazwisko"
                  value={surname}
                  setValue={setSurname}
                />
              </div>
              <div className="single-text-field">
                
                <ListSelector
                  setValue={setRocznik}
                  selectOptions={years}
                  selectName="Rocznik"
                  value={rocznik}
                />
              </div>
              <TextField
                type="email"
                placeholder="twój@email.com"
                value={email}
                setValue={setEmail}
                className="short-version"
              />
              <TextField
                  type="number"
                  placeholder="Wzrost w cm"
                  value={height}
                  setValue={setHeight}
                  className={"short-version"}
              />

              <Question
                type={"1"}
                name={"Płeć"}
                answers={["Dziewczyna","Chłopak"]}
                setAnswer={setCurrentAnswer}
                currentAnswer={currentAnswer}
                currentQuestion={currentQuestion}
              />
              <PrimaryButton
                clickAction={saveForm}
                name="Zarejestruj się"
                isActive={isFilled}
              />
            </motion.div> }
          </>
        )}
      </div>
    </div>
  );
}

export default App;
