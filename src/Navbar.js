import "./Navbar.css";
import { ReactComponent as Logo } from "./Logo.svg";

function Navbar() {
  return (
    <div className="navbar">
      <Logo className="small-logo" />
    </div>
  );
}

export default Navbar;
