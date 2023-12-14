
import './styles/Robot.css';
import ToyRobot from './components/ToyRobot';
function App() {
  return (
    <div className="app">
       <h1>Robot Toy</h1>
      <ToyRobot gridSize= {5}/>
    </div>
  );
}

export default App;
