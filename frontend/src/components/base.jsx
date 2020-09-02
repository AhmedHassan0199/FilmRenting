import React, { Component, useEffect } from "react";

const Base = (props) => {
  const { history } = props;
  function handleLogin() {
    history.push("/login");
  }
  function handleReg() {
    history.push("/register");
  }
  useEffect(() => {
    if (localStorage.usertoken) history.push("/filmList");
  });
  return (
    <div className="container">
      <div className="jumbotron mt-5">
        <div>
          <h1>Welcome to Film Renting App</h1>
          <button
            onClick={handleLogin}
            className="btn btn-lg btn-primary btn-block"
          >
            Login
          </button>
          <button
            onClick={handleReg}
            className="btn btn-lg btn-primary btn-block"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Base;
