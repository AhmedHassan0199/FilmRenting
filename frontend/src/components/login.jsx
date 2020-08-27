import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../inputs";
import { login } from "../redux/auth";

const Login = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const loginStore = useSelector(({ auth }) => auth.login);

  useEffect(() => {
    if (loginStore.successMsg) {
      setSuccessMsg(loginStore.successMsg);
      setErrorMsg(null);
      setTimeout(function () {
        //Go to profile
        window.location.href = "/profile";
        //
      }, 2000);
    } else if (loginStore.errorMsg) {
      setErrorMsg(loginStore.errorMsg);
      setSuccessMsg(null);
    }
  }, [loginStore.successMsg, loginStore.errorMsg]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      const values = { username, password };
      dispatch(login(values));
    } else {
      setErrorMsg("Missing fields, please try again");
    }
  };

  return (
    <div className="container">
      <div className="col-md-6 mt-5 mx-auto">
        <form noValidate onSubmit={onSubmit}>
          <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
          {errorMsg && (
            <div className="alert alert-danger" role="alert">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="alert alert-success" role="alert">
              {successMsg}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="username">UserName</label>
            <Input
              name="username"
              placeholder="Enter Your UserName"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              name="password"
              placeholder="Enter Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-lg btn-primary btn-block">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
