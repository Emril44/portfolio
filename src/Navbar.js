import './Navbar.css';
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="navbar">
            <div className="logo-ig-idk-lol">
                <p><Link to="/">Portfolio</Link></p>
            </div>
            <div className="nav-buttons">
                <ul className="work-button-list">
                    <li><Link to="/contacts">Contacts</Link></li>
                    <li><Link to="/about">About Me</Link></li>
                    <li><Link to="/certifications">Certifications</Link></li>
                    <li><Link to="/projects">Projects</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;