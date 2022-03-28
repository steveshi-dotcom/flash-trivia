import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import HomePage from "./components/Start/HomePage";
import Main from './components/Main/Main';
import Result from './components/Result/Result';

// Urls routes
export const homeUrl = "/home";
export const mainUrl = "/main";
export const resultUrl = "/result";

function App() {    /*TODO Resize the elements so that the view on the phone would have the video ono the bottom */
  /*
  http://localhost:3000
  */
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Navigate to={homeUrl} />} />
            <Route path={homeUrl} element={<HomePage />} />
            <Route path={mainUrl} element={<Main userDifficulty={"hard"}/>} />
            <Route path={resultUrl} element={<Result />} />
            <Route path={"*"} element={
              <main style={{padding: "1rem"}}>
                <h1>🍬👽  ⓗ𝐄𝕃𝐥𝐎  🐳✋</h1>
                <h1>There is nothing in this page</h1>
              </main>
            } />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
