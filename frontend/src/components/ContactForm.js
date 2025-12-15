import {toast} from "react-toastify";
import {useState} from "react";
import "./ContactForm.css"

function ContactForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);

        fetch("http://localhost:8080/api/contact", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(form)
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to send message");
                return res.text();
            })
            .then(() => {
                toast.success("Message sent!");
                setForm({name: "", email: "", message: ""})
            })
            .catch(() => {
                toast.error("Could not send message");
            })
            .finally(() => setLoading(false));
    };

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <input
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
            />

            <input
                name="email"
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={handleChange}
                required
            />

            <textarea
                name="message"
                placeholder="Your message"
                value={form.message}
                onChange={handleChange}
                required
            />

            <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send message"}
            </button>
        </form>
    );
}

export default ContactForm;