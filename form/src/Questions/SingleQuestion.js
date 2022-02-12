import "./Question.css";
import Option from "./Option";

function SingleQuestion(props) {
  const answers = props.answers.map((answer, index) => (
    <Option
      className={
        props.currentAnswer === index+1
          ? "option-container active"
          : "option-container"
      }
      key={index+1}
      clickAction={() => props.setAnswer(index+1)}
      answer={answer}
      type="1"
    />
  ));

  return (
    <div className="question-container">
      <h3 className="question-label">{props.name}</h3>
      <div className="answers">{answers}</div>
    </div>
  );
}

export default SingleQuestion;
