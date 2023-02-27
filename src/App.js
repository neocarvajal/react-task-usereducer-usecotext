import logo from './logo.svg';
import './App.css';
import Tasks from './components/Tasks';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width='150' height='150' />
        <Tasks/>
      </header>
      
    </div>
  );
}

export default App;
