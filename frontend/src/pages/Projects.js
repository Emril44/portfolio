import React, { useEffect, useState, useRef } from "react";
import "./Projects.css";
import { toast } from 'react-toastify';

function Projects() {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        if(hasFetched.current) return;
        hasFetched.current = true;

        fetch("http://localhost:8080/api/github/repos")
            .then(res => {
                if(!res.ok) throw new Error("Failed to fetch repos");
                return res.json();
            })
            .then(data => {
                setRepos(data);
                toast(
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span
                            className="material-icons"
                            style={{ color: "#34C990", verticalAlign: "middle" }}
                        >
                                done_outline
                                </span>
                        <div>
                            <strong>Projects loaded!</strong>
                            <p style={{ fontSize: "0.9rem", opacity: 0.8, margin: 0 }}>
                                Fetched from GitHub
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
                                Couldn't fetch projects
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
                <p>Loading projects...</p>
            </div>
        );
    }

    if(error) {
        return <p className="error">Error: {error}</p>
    }

    return (
        <div className="projects-container">
            <h1 className="projects-header">MY PROJECTS</h1>
            <div className="projects-list">
                {repos.map(repo => (
                    <a
                        key={repo.name}
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-card"
                    >
                        <div className="project-header">
                            <h2>{repo.name}</h2>
                            {repo.languageName && (
                                <span
                                    className="language-dot"
                                    style={{ backgroundColor: repo.languageColor }}
                                />
                            )}
                        </div>
                        <p>{repo.description || "Inventing description in progress..."}</p>

                        {repo.name === "portfolio" && (
                            <p className="special-note">(You're viewing this project right now!)</p>
                        )}
                        <div className="project-footer">
                            <span>Stargazers: {repo.stargazerCount}</span>
                            {repo.languageName && (
                                <span>{repo.languageName}</span>
                            )}
                        </div>
                    </a>
                    ))}
            </div>
        </div>
    );
}

export default Projects;