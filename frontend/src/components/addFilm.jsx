import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../inputs";
import { registration } from "../redux/auth";
import { useForm } from "react-hook-form";

const addFilm = () => {
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line
    watch,
    errors,
    // eslint-disable-next-line
    getValues,
    formState,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const dispatch = useDispatch();

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

  const onSubmit = (formData) => {
    if (formState.isValid) {
      dispatch(registration(formData));
    }
  };

  return (
    <div className="container">
      <div className="col-md-6 mt-2 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <Input
              name="firstName"
              placeholder="First Name"
              label="First Name"
              errors={errors}
              register={register}
              required={"Required!"}
            />
          </div>
          <div className="form-group">
            <Input
              name="lastName"
              placeholder="Enter Your Last Name"
              label="Last Name"
              errors={errors}
              register={register}
              required={"Required!"}
            />
          </div>
          <div className="form-group">
            <Input
              name="phoneNumber"
              placeholder="Enter Your phone number"
              label="Phone Number"
              errors={errors}
              register={register}
              required={"Required!"}
            />
          </div>
          <div className="form-group">
            <Input
              name="username"
              placeholder="Enter Username"
              label="Username"
              errors={errors}
              register={register}
              required={"Required!"}
            />
          </div>
          <div className="form-group">
            <Input
              name="password"
              type="password"
              placeholder="Enter password"
              label="Password"
              errors={errors}
              minLength={8}
              register={register}
              required={"Required!"}
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
