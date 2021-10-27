import "./CheckBox.css";


function CheckBox(props) {

    return (
        <div className="checkbox-wrapper">
            <input type="checkbox" id='waltz'/>
            <label for='waltz' id='waltzl' className='checkox-label'>Wyrażam chęć zatańczenia walca</label>
        </div>
    );

}

export default CheckBox;