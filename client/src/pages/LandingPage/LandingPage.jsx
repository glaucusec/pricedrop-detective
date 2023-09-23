import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import pricedropImage from "../../assets/pricedrop.jpeg";
export default function Home() {
  return (
    <React.Fragment>
      <section className="hero is-white is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns  is-vcentered reverse-columns">
              <div
                className="column
          is-10-mobile 
          is-10-tablet 
          is-5-desktop 
          is-5-widescreen 
          is-5-fullhd "
                data-aos="fade-down"
              >
                <h1 className="title titled is-1 mb-6">
                  Unlock Savings with PriceDrop Detective: Your Personal Amazon
                  Price Tracker
                </h1>
                <div className="buttons">
                  <Link to={"/register"} className="button is-yellow">
                    Sign Up
                  </Link>
                  <Link to={"/login"} className="button">
                    Login
                  </Link>
                </div>
              </div>
              <div
                data-aos="fade-right"
                className="column
          is-10-mobile 
          is-10-tablet 
          is-4-desktop 
          is-7-widescreen 
          is-4-fullhd is-offset-1-fullhd"
              >
                <figure className="image is-square">
                  <img src={pricedropImage} />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
