import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../inputs";
import { register } from "../redux/auth";
import { useForm } from "react-hook-form";

const Register = () => {
  const { registerForm, handleSubmit, watch, errors } = useForm();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const registerStore = useSelector(({ auth }) => auth.register);

  useEffect(() => {
    if (registerStore.successMsg) {
      setSuccessMsg(registerStore.successMsg);
      setErrorMsg(null);
    } else if (registerStore.errorMsg) {
      setErrorMsg(registerStore.errorMsg);
      setSuccessMsg(null);
    }
  }, [registerStore.successMsg, registerStore.errorMsg]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (firstName && lastName && phoneNumber && username && password) {
      const values = { firstName, lastName, phoneNumber, username, password };
      dispatch(register(values));
    } else {
      setErrorMsg("Missing fields, please try again");
    }
  };

  return (
    <div className="container">
      <div className="col-md-6 mt-2 mx-auto">
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <h1 className="h3 mb-3 font-weight-normal">Register</h1>
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
            <label htmlFor="first_name">First Name</label>
            <Input
              name="firstName"
              placeholder="Enter Your First Name"
              value={firstName}
              ref={registerForm({ required: false })}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <Input
              name="lastName"
              placeholder="Enter Your Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone_number">Phone Number</label>
            <Input
              name="phoneNumber"
              placeholder="Enter Your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">UserName</label>
            <Input
              name="userName"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              name="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-lg btn-primary btn-block mb-2"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
