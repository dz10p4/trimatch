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
          ? "sl-option-container active"
          : "sl-option-container"
      }
      key={index}
      clickAction={props.setAnswer}
      options={options}
      answer={answer}
      type="2"
    />
  ));

  return (
    <div className="question-container">
       <h3 class="question-label"></h3>
      <div className="sl-answers">{answers}</div>
    </div>
  );
}

export default MultipleQuestion;
