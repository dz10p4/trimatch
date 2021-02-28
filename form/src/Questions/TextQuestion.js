import "./Question.css";
import TextField from "../Fields/TextField";

function TextQuestion(props) {
  return (
    <div className="question-container">
      <h3 className="question-label">{props.name}</h3>
      <TextField
        type="text"
        placeholder="Odpowiedź"
        value={props.currentAnswer}
        setValue={props.setAnswer}
        className="short-version"
      />
    </div>
  );
}

export default TextQuestion;
