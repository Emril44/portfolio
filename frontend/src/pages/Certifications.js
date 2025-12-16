import {useEffect, useRef, useState} from "react";
import "./Certifications.css";
import {toast} from "react-toastify";

function Certifications() {
    const [certs, setCerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        if(hasFetched.current) return;
        hasFetched.current = true;

        fetch(`${process.env.REACT_APP_API_URL}/api/certifications`)
            .then(res => {
                if(!res.ok) throw new Error("Failed to fetch certificates");
                return res.json();
            })
            .then(data => {
                setCerts(data);
                toast(
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span
                            className="material-icons"
                            style={{ color: "#34C990", verticalAlign: "middle" }}
                        >
                                done_outline
                                </span>
                        <div>
                            <strong>Certificates loaded!</strong>
                            <p style={{ fontSize: "0.9rem", opacity: 0.8, margin: 0 }}>
                                Fetched from JSON
                            </p>
                        </div>
                    </div>
                );
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                toast(
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span
                            className="material-icons"
                            style={{ color: "#C9346D", verticalAlign: "middle" }}
                        >block</span>
                        <div>
                            <strong>Error!</strong>
                            <p style={{ fontSize: "0.9rem", opacity: 0.8, margin: 0 }}>
                                Couldn't fetch certificates
                            </p>
                        </div>
                    </div>
                );
                setError("Backend is still asleep - try again in a moment!");
                setLoading(false);
            });
    }, []);

    if(loading) {
        return (
            <div className="loading-container">
                <div className="loading-speen"></div>
                <p>Loading certificates...</p>
            </div>
        );
    }

    if(error) {
        return <p className="error">Error: {error}</p>
    }

    return (
        <div className="cert-grid">
            {certs.map(cert => (
                <div key={cert.id} className="cert-card">
                    <h3>{cert.title}</h3>
                    <p>{cert.issuer}</p>
                    <p>{cert.year}</p>

                    <a
                        href={cert.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View Certificate
                    </a>
                </div>
            ))}
        </div>
    );
}

export default Certifications;