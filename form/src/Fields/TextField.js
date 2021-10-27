import "./TextField.css";

function TextField(props) {
    return (
        <input
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={(e) => props.setValue(e.target.value)}
            className={`text-input ${props.className}`}
            onKeyPress={props.onKeyPress}
        />
    );
}

export default TextField;
