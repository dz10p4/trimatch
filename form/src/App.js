import "./App.css";
import { useState, useEffect, useRef } from "react";
import firebase from "firebase/app";
import "firebase/functions";
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
  apiKey: "AIzaSyCJMWn5UpHTVEKDE-gDpxVB4r91H6mUK8s",
  authDomain: "trimatch-b613b.firebaseapp.com",
  databaseURL: "https://trimatch-b613b.firebaseio.com",
  projectId: "trimatch-b613b",
  storageBucket: "trimatch-b613b.appspot.com",
  messagingSenderId: "441864222282",
  appId: "1:441864222282:web:27ef1fe7471aba8f3798b3",
  measurementId: "G-FRQPZDTHMK",
};

firebase.initializeApp(firebaseConfig);

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
    "mat-pol/IB",
    "spoza Trójki"
  ];
  const years = ["1", "2 po podstawówce", "2 po gimnazjum", "3"];
  const questions = [
    {
      type: "1",
      name: "Płeć:",
      answers: ["Kobieta", "Mężczyzna", "Osoba niebinarna"],
    },
    {
      type: "1",
      name: "Szukasz:",
      answers: [
        "Chłopaka",
        "Dziewczyny",
        "Przyjaciela",
        "Związku (płeć nie ma znaczenia)",
      ],
    },
    {
      type: "1",
      name: "Co jest dla ciebie priorytetem w związku?",
      answers: [
        "wolność",
        "wierność",
        "wzajemne wsparcie",
        "dobra zabawa",
      ],
    },
    {
      type: "1",
      name: "Twoja wymarzona randka:",
      answers: ["Kolacja przy świecach", "Wieczór z dobrym filmem i pizzą", "Piknik w parku", "Wielogodzinny spacer", "Kreatywna i pełna niespodzianek"],
    },
    {
      type: "1",
      name: "Jak odnajdujesz się w towarzystwie rówieśników?",
      answers: ["Staram się poznać jak najwięcej ludzi", "Trzymam się stałego grona", "Obydwa po trochu"],
    },
    {
      type: "1",
      name: "Jak głównie spędzasz czas poza szkołą?",
      answers: [
        "trenuję sport",
        "czytam książki",
        "spędzam czas ze znajomymi",
        "rozwijam swoje hobby",
        "oglądam filmy i seriale",
      ],
    },
    {
      type: "3",
      name: "Co byś zabrał na bezludną wyspę?",
      
    },
    {
      type: "3",
      name: "A może masz kogoś na oku? Daj nam znać, zobaczymy co da się zrobić;)",
    },
    
  ];
  const questionCount = questions.length;

  const [email, setEmail] = useState("");
  const [rocznik, setRocznik] = useState("Rocznik");
  const [profil, setProfil] = useState("Profil");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [socialmedia, setSocialmedia] = useState("");

  function saveForm() {
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
      const saveData = firebase.functions().httpsCallable("registerUser");
      saveData({
        name: name,
        surname: surname,
        profile: profil,
        year: rocznik,
        email: email,
        social: socialmedia,
        answers: answers,
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.data);
        });
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (
      email != "" &&
      rocznik != "Rocznik" &&
      profil != "Profil" &&
      name != "" &&
      surname != "" &&
      socialmedia != ""
    )
      setIsFilled(true);
  }, [email, rocznik, profil, name, surname, socialmedia]);

  useEffect(() => {
    if(currentAnswer)setIsFilled(true);
  }, [currentAnswer]);

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
                  currentQuestion === questionCount ? "Podsumowanie" : "Następne pytanie"
                }
                isActive={isFilled}
              />
            </>
          ) : (
            <RegistrationSuccessful />
          )
        ) : (
          <>
            <motion.div
              className="lottie-container"
              ref={lottieContainer}
              animate={isAnimated ? { opacity: 0 } : { opacity: 1 }}
              transition={{ delay: 1.5 }}
            />
            {/* <p className="message">Zapisy zakończone. Dziękujemy wszystkim za wpisanie się.</p> */}
            <motion.div
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
              <div className="double-text-field">
                <ListSelector
                  setValue={setProfil}
                  selectOptions={profiles}
                  selectName="Profil"
                  value={profil}
                />
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
                type="text"
                placeholder="Twoje social media"
                value={socialmedia}
                setValue={setSocialmedia}
                className="short-version"
              />
              <PrimaryButton
                clickAction={saveForm}
                name="Zarejestruj się"
                isActive={isFilled}
              />
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
