import "./Question.css";
import Option from "./Option";
import { useState, useEffect } from "react";

function MultipleQuestion(props) {
  const [options, setOptions] = useState(null);
  useEffect(() => {
    props.setAnswer(options);
  }, [options]);

  const answers = props.answers.map((answer, index) => (
    <Option
      className={
        props.currentAnswer === index
          ? "option-container active"
          : "option-container"
      }
      key={index}
      clickAction={setOptions}
      options={options}
      answer={answer}
      type="2"
    />
  ));

  return (
    <div className="question-container">
      <h3 className="question-label">{props.name}</h3>
      <div className="answers">{answers}</div>
    </div>
  );
}

export default MultipleQuestion;
