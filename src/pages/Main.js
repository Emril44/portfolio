import Canvas from "../components/Canvas";
import HeroCard from "../components/HeroCard";

function Main() {
    return (
        <div style={{ position: "relative", minHeight: "100vh" }}>
            <Canvas className="canvas" />
            <div style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start", /* so it doesn’t stick to the very center vertically */
                minHeight: "100vh",
                paddingBottom: "1em" /* push down below navbar */
            }}>
                <HeroCard>
                    <h1>Hello, I’m a dev</h1>
                    <p>feef</p>
                </HeroCard>
            </div>
        </div>
    );
}

export default Main;