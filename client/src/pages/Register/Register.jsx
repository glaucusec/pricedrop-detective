import React, { useState, Fragment, useRef, useContext } from "react";
import { Navigate } from "react-router-dom";
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
      <Header />
      <div className="container">
        <form onSubmit={registerFormSubmitHandler} className="form">
          <h1 className="title"> Register</h1>
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input
                ref={nameRef}
                class="input"
                type="text"
                placeholder="Enter you Name..."
              />
            </div>
          </div>
          <div class="field">
            <label class="label">UserName</label>
            <div class="control">
              <input
                ref={usernameRef}
                class="input"
                type="text"
                placeholder="Enter you username..."
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left ">
              <input
                ref={emailRef}
                class="input"
                type="email"
                placeholder="Enter your Email..."
              />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left">
              <input
                ref={passwordRef}
                class="input"
                type="password"
                placeholder="Enter your Password..."
              />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link">Register</button>
            </div>
            <div class="control">
              <button class="button is-link is-light">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
}
