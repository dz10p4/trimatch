import "./Navbar.css"

function Navbar({handlerFunction, currentState}) {
    return (

        <div className="root1">

            <div className="logod">
                <img src="logo.png" width="100px" height="100px" />
            </div>
        
            <div className="cselect">
                <select name="selector" className="selector" onChange={handlerFunction} value={currentState}>
                    <optgroup label="Listy:">
                        <option id="s1" value="1">Wszystkie osoby wpisane</option>
                        <option id="s2">Osoby dobrane</option>
                        <option id="s3">Wysyłanie dobranych osób</option>
                    </optgroup>
                    <optgroup label="Dobieranie:">
                        <option id="s4" value="4">Dobieraj</option>
                    </optgroup>
                </select>
            </div>

        </div>




    );
}

export default Navbar;