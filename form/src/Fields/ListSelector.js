import "./ListSelector.css";
import { IconContext } from "react-icons";
import { IoChevronDownOutline } from "react-icons/io5";

function ListSelector(props) {
  const selectOptions = props.selectOptions.map((option) => (
    <option className="availableOption" key={option}>
      {option}
    </option>
  ));

  return (
    <div
      className={
        props.value === props.selectName
          ? "select-container collapsed"
          : "select-container"
      }
    >
      <select
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
      >
        <option disabled>{props.selectName}</option>
        {selectOptions}
      </select>
      <IconContext.Provider value={{ className: "icon" }}>
        <IoChevronDownOutline />
      </IconContext.Provider>
    </div>
  );
}

export default ListSelector;
