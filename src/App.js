import './App.css';
import About from './components/About'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';
import NoteState from './context/notes/NotesState';
import Alert from './components/Alert';

function App() {
  return (
    <>
    <NoteState>
      <Router>
        <NavBar></NavBar>
        {/* <Alert message = "success" /> */}
        <div className="container">
          <Routes>
              <Route exact path="/"  element = {<Home/>}/>
              <Route exact path="/about"  element = {<About/>}/>
          </Routes>
          </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
