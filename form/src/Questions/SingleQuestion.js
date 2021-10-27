import "./Question.css";
import Option from "./Option";

function SingleQuestion(props) {
  const answers = props.answers.map((answer, index) => (
    <Option
      className={props.currentAnswer === index ? "option-container active" : "option-container"}
      key={index}
      clickAction={() => props.setAnswer(index)}
      answer={answer}
      type="1"
    />
  ));

  return <div className="question-container">{answers}</div>;
}

export default SingleQuestion;
