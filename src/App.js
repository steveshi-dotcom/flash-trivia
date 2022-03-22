import './App.css';
import Header from './components/Header'
import TriviaGame from './components/TriviaGame'
import MultiplayerVideo from './components/MultiplayerVideo'

function App() {
  return (
    <div className={"App"}>
      <Header />
      <TriviaGame userDifficulty={'hard'}/>
      <MultiplayerVideo />
    </div>
  );
}

export default App;
