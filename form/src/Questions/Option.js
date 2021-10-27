import "./Option.css";
import { IconContext } from "react-icons";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useState } from "react";

function Option(props) {
  const [isSelected, setIsSelected] = useState(false);

  function handleClick() {
    // if (isSelected)
    //   setIsSelected(false);
    //   // props.clickAction(
    //   //   props.options.filter((option) => option !== props.answer)
    //   // );
    // else props.clickAction([...props.options, props.answer]);
    console.log(isSelected);
    setIsSelected(!isSelected);
  }

  if (props.type === "1")
    return (
      <div className={props.className} onClick={() => props.clickAction()}>
        <div className="icon-wrapper">
          <IconContext.Provider value={{ className: "success-icon" }}>
            <IoCheckmarkCircleOutline />
          </IconContext.Provider>
        </div>
        <p>{props.answer}</p>
      </div>
    );
  else if (props.type === "2")
    return (
      <div
        className={isSelected ? "sl-option-container active" : "sl-option-container"}
        onClick={() => {
          handleClick();
          props.clickAction(isSelected);
        }}
      >
        <IconContext.Provider value={{ className: "success-icon" }}>
          <IoCheckmarkCircleOutline />
        </IconContext.Provider>
        <p>{props.answer}</p>
      </div>
    );
}

export default Option;
