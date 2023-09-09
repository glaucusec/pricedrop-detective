import React from "react";
import { Link } from "react-router-dom";

import SectionDivider from "../SectionDivider";

export default function Header() {
  return (
    <SectionDivider>
      <nav class="navbar mb-6" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <Link class="navbar-item" to="/">
            PriceDrop
          </Link>

          <a
            role="button"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <Link to={"/home"} class="navbar-item">
              Home
            </Link>
            <Link to={"/products"} class="navbar-item">
              Products
            </Link>

            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">More</a>

              <div class="navbar-dropdown">
                <a class="navbar-item">About</a>
                <a class="navbar-item">Jobs</a>
                <a class="navbar-item">Contact</a>
                <hr class="navbar-divider" />
                <a class="navbar-item">Report an issue</a>
              </div>
            </div>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <Link to={"/register"} class="button is-primary">
                  <strong>Sign up</strong>
                </Link>
                <Link to={"/login"} class="button is-light">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </SectionDivider>
  );
}
