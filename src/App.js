import './App.css';
//import HomePage from "./components/Start/HomePage";


import Main from './components/Main/Main';

function App() {    /*TODO Resize the elements so that the view on the phone would have the video ono the bottom */
  return (
    <div className={"App"}>
      <Main userDifficulty={"hard"}/>
    </div>
  );
}

export default App;
