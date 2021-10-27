import "./Question.css";
import Option from "./Option";

function Waltz({currentState, setCurrentState, answer}) {
  return (
    <div className="question-container">
        <Option
        className={`full-question ${currentState ? "option-container active" : "option-container"}`}
        clickAction={() => setCurrentState(!currentState)}
        answer={answer}
        type="1"
        />
    </div>
  );
}

export default Waltz;
