import React from "react";
import "./HeroCard.css";

const HeroCard = ({ children }) => {
    return (
        <div className="hero-card">
            <svg className="hero-border" viewBox="0 0 1600 700" preserveAspectRatio="none">
                <polygon
                    points="0,0 1600,0 1600,700 90,700 0,580"
                    fill="rgba(0,0,0,0.6)"
                    stroke="#c9346d"
                    strokeWidth="2"
                />
            </svg>
            <div className="hero-content">
                {children}
            </div>
        </div>
    );
};

export default HeroCard;