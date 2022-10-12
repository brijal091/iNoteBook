import logo from './logo.svg';
import './App.css';
import About from './components/About'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';

function App() {
  return (
    <>
    <Router>
      <NavBar></NavBar>
      <Routes>
          <Route exact path="/"  element = {<Home/>}/>
      </Routes>
      <Routes>
          <Route exact path="/about"  element = {<About/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
