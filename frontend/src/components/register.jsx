import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../inputs';
import { registration } from '../redux/auth';
import { useForm } from 'react-hook-form';

const Register = () => {
  const { register, handleSubmit, watch, errors, getValues, formState } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const dispatch = useDispatch();
  console.log('getValues', errors, getValues());

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
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
            <Input name="firstName" placeholder="First Name" label="First Name" errors={errors} register={register} required={'Required!'} />
          </div>
          {/* <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <Input name="lastName" placeholder="Enter Your Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="phone_number">Phone Number</label>
            <Input name="phoneNumber" placeholder="Enter Your phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="username">UserName</label>
            <Input name="userName" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input name="password" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div> */}

          <button type="submit" className="btn btn-lg btn-primary btn-block mb-2">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
