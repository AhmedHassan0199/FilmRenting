import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../inputs";
import { login } from "../redux/auth";
import { useForm } from "react-hook-form";

const Login = (props) => {
  const { history } = props;
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
  const loginStore = useSelector(({ auth }) => auth.login);

  useEffect(() => {
    if (loginStore.successMsg) {
      setSuccessMsg(loginStore.successMsg);
      setErrorMsg(null);
      if (localStorage.usertoken) history.push("/filmList");
    } else if (loginStore.errorMsg) {
      setErrorMsg(loginStore.errorMsg);
      setSuccessMsg(null);
    }
  }, [loginStore.successMsg, loginStore.errorMsg]);

  const onSubmit = (formData) => {
    if (formState.isValid) {
      dispatch(login(formData));
    }
  };

  return (
    <div className="container">
      <div className="col-md-6 mt-5 mx-auto">
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
            <Input
              name="username"
              label="Username"
              placeholder="Enter Your UserName"
              errors={errors}
              register={register}
              required={"Required"}
            />
          </div>
          <div className="form-group">
            <Input
              name="password"
              label="Password"
              type="password"
              placeholder="Enter Your password"
              errors={errors}
              register={register}
              required={"Required"}
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
