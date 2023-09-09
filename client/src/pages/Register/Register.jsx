import React, { Fragment } from "react";

import Header from "../../components/Header/Header";
import SectionDivider from "../../components/SectionDivider";

export default function Register() {
  return (
    <Fragment>
      <Header />
      <SectionDivider>
        <form className="form">
          <h1 className="title"> Register</h1>
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input
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
      </SectionDivider>
    </Fragment>
  );
}
