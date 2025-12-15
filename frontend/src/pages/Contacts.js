import "./Contacts.css";
import ContactForm from "../components/ContactForm";

function Contacts() {
        return (
        <div className="contact-section">
            <h2 className="section-header">Contact Me</h2>
            <p className="contact-text">
                Got a project or just want to say hi? Feel free to reach out!
            </p>
            <div className="contact-links">
                <a href="mailto:maximus.khomenko@gmail.com" className="contact-link">maximus.khomenko@gmail.com</a>
                <a href="https://github.com/Emril44" target="_blank" rel="noreferrer"
                   className="contact-link">GitHub</a>
                <a href="https://www.linkedin.com/in/maksym-khomenko-887654262" target="_blank" rel="noreferrer"
                   className="contact-link">LinkedIn</a>
            </div>

            <p className="contact-text">
                ...Or reach out directly!
            </p>
            <ContactForm/>
        </div>
    )
}

export default Contacts;