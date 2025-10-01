import Canvas from "../components/Canvas";
import HeroCard from "../components/HeroCard";
import "./Main.css"
import myface from "../assets/myface.jpg";

function Main() {
    return (
        <div style={{ position: "relative", minHeight: "100vh" }}>
            <Canvas className="canvas" />
            <div style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                minHeight: "100vh",
            }}>
                <HeroCard>
                    <div className="hero-layout">
                        <img src={myface} alt="Portrait of Max" className="portrait" />
                        <div className="hero-text">
                            <h1 className="hero-header1">Hello, I’m Max.</h1>
                            <h2 className="hero-header2">I build clean, efficient, and creative solutions in web development.</h2>
                            <p className="hero-subtitle">I'm adept at Java (Spring Boot) and JavaScript (React, Vue).</p>
                            <button className="call-to-action">
                                <div className="call-to-action__content">View my work_</div>
                                <span className="call-to-action__glitch"></span>
                                <span className="call-to-action__label">mk44</span>
                            </button>
                        </div>
                    </div>
                </HeroCard>
            </div>
        </div>
    );
}

export default Main;