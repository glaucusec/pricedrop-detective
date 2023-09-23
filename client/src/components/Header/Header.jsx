import React, { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserAuth";

import "./Header.css";

export default function Header() {
  const authCtx = useContext(UserContext);
  const isLoggedIn = !!authCtx.user.id;

  async function logoutHandler(e) {
    e.preventDefault();
    authCtx.setInvalidUserHandler();
    document.location = "/";
  }
  return (
    <nav
      className="navbar mb-6 is-info"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            {isLoggedIn && (
              <Link to={"/home"} className="navbar-item bold_link">
                Home
              </Link>
            )}
            {isLoggedIn && (
              <Link to={"/products"} className="navbar-item bold_link">
                Products
              </Link>
            )}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {/* {!isLoggedIn && (
                  <Link to={"/register"} className="button is-primary ">
                    <strong>Sign up</strong>
                  </Link>
                )}
                {!isLoggedIn && (
                  <Link to={"/login"} className="button is-light">
                    Log in
                  </Link>
                )} */}
                {isLoggedIn && (
                  <Link to="#" onClick={logoutHandler} className="button is-small is-danger">
                    Log out
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
