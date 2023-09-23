import React, { Fragment, useContext, useRef } from "react";
import { Navigate, Link } from "react-router-dom";
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
      <div className="container">
        <form onSubmit={loginFormSubmitHandler} className="form">
          <h1 className="title"> Login</h1>
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left ">
              <input
                className="input"
                type="email"
                placeholder="Enter your Email..."
                ref={emailRef}
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
                className="input"
                type="password"
                placeholder="Enter your Password..."
                ref={passwordRef}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link">Login</button>
            </div>
          </div>
          Not Registered? <Link to={"/register"}>Register Here</Link>
        </form>
      </div>
    </Fragment>
  );
}
