import SingleQuestion from "./SingleQuestion";
import MultipleQuestion from "./MultipleQuestion";
import TextQuestion from "./TextQuestion";

function Question(props) {
  if (props.type === "1")
    return (
      <SingleQuestion
        name={props.name}
        answers={props.answers}
        setAnswer={props.setAnswer}
        currentAnswer={props.currentAnswer}
      />
    );
  else if (props.type === "2")
    return (
      <MultipleQuestion
        name={props.name}
        answers={props.answers}
        setAnswer={props.setAnswer}
        currentAnswer={props.currentAnswer}
        
      />
    );
  else if (props.type === "3")
    return (
      <TextQuestion
        name={props.name}
        setAnswer={props.setAnswer}
        currentAnswer={props.currentAnswer}
      />
    );
}

export default Question;
