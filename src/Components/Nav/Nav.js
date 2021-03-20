import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../App";

const Nav = () => {
  const [logInUser, setLogInUser] = useContext(userContext);
  return (
    <>
      <div className="container header_nav mt-3">
        <nav className="navbar navbar-expand-lg navbar-light ">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <p className="navbar-brand font-weight-bold">City Riders</p>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <Link className="nav-link pr-3 font-weight-bold" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item text-dark  pr-3 font-weight-bold">
                <Link className="nav-link text-dark">BLog</Link>
              </li>
              <li className="nav-item    pr-3 font-weight-bold">
                <Link className="nav-link text-dark">Contact</Link>
              </li>
              <li className="nav-item   pr-3 font-weight-bold">
                <Link to="/login" className="nav-link text-dark">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Nav;
