import './App.css';
import Canvas from "./Canvas";
import Navbar from "./Navbar";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Canvas className="canvas"/>
    </div>
  );
}

export default App;
