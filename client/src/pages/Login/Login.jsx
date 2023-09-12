import React, { Fragment, useContext, useRef } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserAuth";

import Header from "../../components/Header/Header";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const authCtx = useContext(UserContext);
  const isLoggedIn = !!authCtx.user.id;

  const loginFormSubmitHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      alert("You are logged in!");
      authCtx.setUserHandler({ id: response.data.id });
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  if (isLoggedIn) {
    return <Navigate to={"/home"} />;
  }
  return (
    <Fragment>
      <Header />
      <div className="container">
        <form onSubmit={loginFormSubmitHandler} className="form">
          <h1 className="title"> Login</h1>
          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left ">
              <input
                class="input"
                type="email"
                placeholder="Enter your Email..."
                ref={emailRef}
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
                class="input"
                type="password"
                placeholder="Enter your Password..."
                ref={passwordRef}
              />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link">Login</button>
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
