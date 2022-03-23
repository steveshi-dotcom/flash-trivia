import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import HomePage from "./components/Start/HomePage";
import Main from './components/Main/Main';
import Result from './components/Result/Result';

function App() {    /*TODO Resize the elements so that the view on the phone would have the video ono the bottom */
  // http://localhost:3000/flash-trivia
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path={"/flash-trivia/HomePage"} element={<HomePage />}/>
            <Route path={"/flash-trivia/GamePage"} element={<Main userDifficulty={"hard"}/>}/>
            <Route path={"/flash-trivia/ResultPage"} element={<Result />}/>
          </Routes>
      </Router>
    </div>
    /*<div className={"App"}>
      <Main userDifficulty={"hard"}/>
    </div>*/
  );
}

export default App;
