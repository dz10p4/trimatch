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
import Waltz from "./Questions/Waltz";

const firebaseConfig = {
  apiKey: "AIzaSyDhgu9WE-J7P9oqHm6N6ksl0fl4zFx8RNg",
  authDomain: "stumatch-12d25.firebaseapp.com",
  projectId: "stumatch-12d25",
  storageBucket: "stumatch-12d25.appspot.com",
  messagingSenderId: "515557187634",
  appId: "1:515557187634:web:74e20bd7a451853d241c2b",
  measurementId: "G-RVCD3B89MD",
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

function App() {
  const [isFilled, setIsFilled] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const years = ["1", "2", "3 po podst", "3 po gimnazjum"];

  const [email, setEmail] = useState("");
  const [rocznik, setRocznik] = useState("Rocznik");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState(null);
  const [dancingWaltz, setDancingWaltz] = useState(false);

  function saveForm() {
    let rocznikw;
    if (rocznik == "3 po gimnazjum") rocznikw = 32;
    else if (rocznik == "3 po podst") rocznikw = 31;
    else rocznikw = rocznik;

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    let hh = today.getHours() < 10 ? "0" + today.getHours() : today.getHours();
    let mi = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    let ss = today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds();

    today = dd + "/" + mm + "/" + yyyy + " " + hh + ":" + mi + ":" + ss;

    let colName1 = rocznikw === 32 ? "" : "Rezerwowe-";
    let colName2 = gender === 1 ? "Chlopaki" : "Dziewczyny";
    let colName3 = rocznikw === 32 ? "" : rocznikw > 3 ? "-3" : "-" + rocznikw;
    colName2 = colName1 + colName2;
    console.log(dancingWaltz);
    db.collection(colName2)
      .doc(name.replace(/\s/g, "") + "-" + surname.replace(/\s/g, "") + colName3)
      .set(
        {
          name: name.replace(/\s/g, ""),
          surname: surname.replace(/\s/g, ""),
          year: rocznikw,
          email: email.replace(/\s/g, ""),
          gender: gender,
          height: height,
          timestamp: today,
          waltz: dancingWaltz,
        },
        { merge: true }
      );

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
  }

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 767;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const lottieContainer = useRef(null);

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  useEffect(() => {
    if (
      rocznik != "Rocznik" &&
      name != "" &&
      surname != "" &&
      height != "" &&
      height >= 120 &&
      height <= 230 &&
      gender != null &&
      validateEmail(email)
    )
      setIsFilled(true);
    else setIsFilled(false);
       
  }, [email, rocznik, name, surname, height, gender, dancingWaltz]);

  return (
    <div className="App">
      {width > breakpoint ? <Logo className="big-logo" /> : <Navbar />}
      <div className="form-section">
        <motion.div
          className="lottie-container"
          ref={lottieContainer}
          animate={isAnimated ? { opacity: 0 } : { opacity: 1 }}
          transition={{ delay: 1.5 }}
        />
        <p className="message">Edycja studniówkowa. Osoby z młodszych klas mile widziane jako rezerwy;)</p>
        <motion.div className="text-fields" animate={isAnimated ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }}>
          <div className="double-text-field">
            <TextField type="text" placeholder="Imię" value={name} setValue={setName} />
            <TextField type="text" placeholder="Nazwisko" value={surname} setValue={setSurname} />
          </div>
          <div className="single-text-field">
            <ListSelector setValue={setRocznik} selectOptions={years} selectName="Rocznik" value={rocznik} />
          </div>
          <TextField
            type="email"
            placeholder="twój@email.com"
            value={email}
            setValue={setEmail}
            className="short-version"
          />
          <Question
            type="1"
            name="Płeć"
            answers={["Dziewczyna", "Chłopak"]}
            setAnswer={setGender}
            currentAnswer={gender}
          />
          <TextField
            type="number"
            placeholder={`${gender === 0 ? "Wzrost + wysokość obuwia" : "Wzrost"} (cm)`}
            value={height}
            setValue={setHeight}
            className="short-version"
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          <Waltz
            answer="Wyrażam chęć zatańczenia walca"
            setCurrentState={setDancingWaltz}
            currentState={dancingWaltz}
          />
          <PrimaryButton clickAction={saveForm} name="Zarejestruj się" isActive={isFilled} />
        </motion.div>
      </div>
    </div>
  );
}

export default App;
