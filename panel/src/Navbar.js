import "./Navbar.css"
function Navbar({handlerFunction, currentState}) {
    return (

        <div className="root1">

            <div className="logod">
                <img src="logo.png" width="100px" height="100px" />
            </div>
           
            <div className="cselect">
                <select name="selector" className="selector" onChange={handlerFunction} value={currentState}>
                    <option id="s3" value="3">Wyloguj</option>
                    <option id="s5" value="5">Funkcje</option>
                    <optgroup label="Listy:">
                        <option id="s1" value="1">Wszystkie osoby wpisane</option>
                        <option id="s2" value="2">Osoby dobrane</option>
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