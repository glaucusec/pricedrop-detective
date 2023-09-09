import React, { Fragment, useContext, useRef } from "react";

import { UserContext } from "../../context/UserAuth";

import SectionDivider from "../../components/SectionDivider";
import Header from "../../components/Header/Header";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const userCtx = useContext(UserContext);
  const loginFormSubmitHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = emailRef.current.value;

    const response = axios.post("http://localhost:3000/api/auth", {});
  };
  return (
    <Fragment>
      <Header />
      <SectionDivider>
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
      </SectionDivider>
    </Fragment>
  );
}
