// import React, {useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate  } from "react-router-dom";

export default function NavBar() {
  const history = useNavigate();
  let location = useLocation();
  // useEffect(() => {
  //    console.log(location.pathname);
  // }, [location]);
  const handleLogout = () => {
    localStorage.removeItem('token')
    history('/login')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            {/* <img src={process.env.PUBLIC_URL+"images/favicon.png"} alt="Image not found"/> */}
            INoteBook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname ==="/"? "active": ""}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname ==="/about"? "active": ""}`} to="/about">
                  About
                </Link>
              </li>
              
            </ul>
            {!localStorage.getItem('token') ? <form className="d-flex">
              <Link to ="/login" className="btn btn-primary mx-2">
                Login
              </Link>
              <Link to ="/signup" className="btn btn-primary mx-2">
                SignUp
              </Link>
            </form> : <button onClick={handleLogout} className="btn btn-primary mx-2">
                LogOut
              </button>}
          </div>
        </div>
      </nav>
    </>
  );
}
