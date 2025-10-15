import React, { useEffect, useState } from "react";
import "./Projects.css";
import { toast } from 'react-toastify';

function Projects() {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/github/repos")
            .then(res => {
                if(!res.ok) throw new Error("Failed to fetch repos");
                return res.json();
            })
            .then(data => {
                setRepos(data);
                toast.success("Projects loaded");
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                toast.error("Failed to load projects")
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
                {repos.map(({ node }) => (
                    <a
                        key={node.name}
                        href={node.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-card"
                    >
                        <div className="project-header">
                            <h2>{node.name}</h2>
                            {node.primaryLanguage && (
                                <span
                                    className="language-dot"
                                    style={{ backgroundColor: node.primaryLanguage.color }}
                                />
                            )}
                        </div>
                        <p>{node.description || "Inventing description in progress..."}</p>

                        {node.name === "portfolio" && (
                            <p className="special-note">(You're viewing this project right now!)</p>
                        )}
                        <div className="project-footer">
                            <span>Stargazers: {node.stargazerCount}</span>
                            {node.primaryLanguage && (
                                <span>{node.primaryLanguage.name}</span>
                            )}
                        </div>
                    </a>
                    ))}
            </div>
        </div>
    );
}

export default Projects;