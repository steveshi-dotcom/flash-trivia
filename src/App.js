import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import HomePage from "./components/Start/HomePage";
import Main from './components/Main/Main';
import Result from './components/Result/Result';

// Urls routes
export const homeUrl = "/home";
export const mainUrl = "/game";
export const resultUrl = "/result";

function App() {    /*TODO Resize the elements so that the view on the phone would have the video ono the bottom */
  // http://localhost:3000/flash-trivia

  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path={homeUrl} element={<HomePage />}/>
            <Route path={mainUrl} element={<Main userDifficulty={"hard"}/>}/>
            <Route path={resultUrl} element={<Result />}/>
          </Routes>
      </Router>
    </div>
    /*<div className={"App"}>
      <Main userDifficulty={"hard"}/>
    </div>*/
  );
}

export default App;
