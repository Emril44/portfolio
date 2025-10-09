import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Projects from "./pages/Projects";
import Certifications from "./pages/Certifications";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Main from "./pages/Main";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Main />}/>
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/certifications" element={<Certifications />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contacts" element={<Contacts />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;
