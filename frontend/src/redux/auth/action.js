import axios from "axios";
import { ACCOUNT_SERVICE_URI, FILM_SERVICE_URI } from "../../utils";

export const types = {
  REGISTER: "REGISTER",
  REGISTER_FAILURE: "REGISTER_FAILURE",
  LOGIN: "LOGIN",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  FILM_ADDED: "ADDED A NEW FILM",
  FILM_NOT_ADDED: "FILM NOT ADDED",
  LIST_RETRIEVED: "LIST IS OKAY",
  LIST_NOT_RETRIEVED: "LIST ERROR",
};

export const registration = (values) => async (dispatch) => {
  axios
    .post(`${ACCOUNT_SERVICE_URI}/users/register`, values)
    .then((response) =>
      dispatch({ type: types.REGISTER, payload: response.data })
    )
    .catch((err) =>
      dispatch({
        type: types.REGISTER_FAILURE,
        payload: err,
      })
    );
};

export const login = (values) => async (dispatch) => {
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

export const addFilm = (values) => async (dispatch) => {
  axios
    .post(`${FILM_SERVICE_URI}/films/addFilm`, values)
    .then((response) => {
      dispatch({ type: types.FILM_ADDED, payload: response.data });
    })
    .catch((err) => {
      dispatch({
        type: types.FILM_NOT_ADDED,
        payload: err,
      });
    });
};
export const getFilms = (values) => async (dispatch) => {
  axios
    .post(`${FILM_SERVICE_URI}/films/filmList`, values)
    .then((response) => {
      dispatch({ type: types.LIST_RETRIEVED, payload: response.data });
    })
    .catch((err) => {
      dispatch({
        type: types.LIST_NOT_RETRIEVED,
        payload: err,
      });
    });
};
