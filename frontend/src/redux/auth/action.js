import axios from "axios";
import { ACCOUNT_SERVICE_URI } from "../../utils";

export const types = {
  REGISTER: "REGISTER",
  REGISTER_FAILURE: "REGISTER_FAILURE",
  LOGIN: "LOGIN",
  LOGIN_FAILURE: "LOGIN_FAILURE",
};

export const register = (values) => async (dispatch) => {
  console.log("values", values);

  axios
    .post(`${ACCOUNT_SERVICE_URI}/users/register`, values)
    .then((response) =>
      dispatch({ type: types.REGISTER, payload: response.data })
    )
    .catch((err) =>
      dispatch({
        type: types.REGISTER_FAILURE,
        payload: err.error,
      })
    );
};

export const login = (values) => async (dispatch) => {
  console.log("values", values);
  axios
    .post(`${ACCOUNT_SERVICE_URI}/users/login`, values)
    .then((response) => {
      dispatch({ type: types.LOGIN, payload: response.data });
    })
    .catch((err) => {
      dispatch({
        type: types.LOGIN_FAILURE,
        payload: err,
      });
    });
};

export const profile = () => async (dispatch) => {
  axios
    .post(`${ACCOUNT_SERVICE_URI}/users/profile`)
    .then((response) => {
      dispatch({ type: types.PORFILE, payload: response.data });
    })
    .catch((err) => {
      dispatch({
        type: types.PROFILE_FAILURE,
        payload: err,
      });
    });
};
