import './Navbar.css';

function Navbar() {
    return (
        <div className="navbar">
            <div className="logo-ig-idk-lol">
                <p>Max's Portfolio</p>
            </div>
            <div className="nav-buttons">
                <ul className="work-button-list">
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#certifications">Certifications</a></li>
                    <li><a href="#about-me">About Me</a></li>
                    <li><a href="#contacts">Contacts</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;