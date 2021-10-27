import "./RadioInput.css";

const RadioInput = ({ label, id, name }) => (
    <div className="radio-wrapper">
        <input type="radio" id={id} name={name} />
        <label for={id} id={id} className="radio-label">
            {label}
        </label>
    </div>
);

export default RadioInput;
