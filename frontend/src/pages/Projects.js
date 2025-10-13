import React, { useEffect, useState } from "react";
import "./Projects.css";

function Projects() {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/github/repos")
            .then(res => res.json())
            .then(data => setRepos(data))
            .catch(err => console.error("Failed to fetch repos: ", err));
    }, []);

    return (
        <div className="projects-container">
            <h1 className="projects-header">My Projects</h1>
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