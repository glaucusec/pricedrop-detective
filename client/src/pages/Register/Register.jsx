import React, { useState, Fragment, useRef, useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header/Header";

export default function Register() {
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const nameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function registerFormSubmitHandler(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          name: nameRef.current.value,
          username: usernameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }
      );
      if (response.status === 201) {
        alert("You signed Up. Please login!");
        setRegistrationComplete(true);
      }
    } catch (err) {
      console.log("error@Register");
      alert(`${err.response.status} - ${err.response.data.message}`);
    }
  }

  if (registrationComplete) {
    return <Navigate to={"/login"} />;
  }

  return (
    <Fragment>
      
      <div className="container">
        <form onSubmit={registerFormSubmitHandler} className="form">
          <h1 className="title"> Register</h1>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                ref={nameRef}
                className="input"
                type="text"
                placeholder="Enter you Name..."
              />
            </div>
          </div>
          <div className="field">
            <label className="label">UserName</label>
            <div className="control">
              <input
                ref={usernameRef}
                className="input"
                type="text"
                placeholder="Enter you username..."
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left ">
              <input
                ref={emailRef}
                className="input"
                type="email"
                placeholder="Enter your Email..."
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left">
              <input
                ref={passwordRef}
                className="input"
                type="password"
                placeholder="Enter your Password..."
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link">Register</button>
            </div>
            <div className="control">
              <button className="button is-link is-light">Cancel</button>
            </div>
          </div>
          Already a Member? <Link to={"/login"}>Login Here</Link>
        </form>
      </div>
    </Fragment>
  );
}
