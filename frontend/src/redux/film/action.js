import axios from 'axios';
import { FILM_SERVICE_URI } from '../../utils';

export const types = {
  FILM_ADDED: 'ADDED A NEW FILM',
  FILM_NOT_ADDED: 'FILM NOT ADDED',
  LIST_RETRIEVED: 'LIST IS OKAY',
  LIST_NOT_RETRIEVED: 'LIST ERROR',
  FILM_RENTED: 'FILM RENTED',
  FILM_NOT_RENTED: 'FILM NOT RENTED',
};

export const addFilm = (values) => async (dispatch) => {
  axios
    .post(`${FILM_SERVICE_URI}/films/addFilm`, values, {
      headers: { Authorization: `Bearer ${localStorage.usertoken}` },
    })
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
export const getFilms = () => async (dispatch) => {
  axios
    .get(`${FILM_SERVICE_URI}/films/filmList`, {
      headers: { Authorization: `Bearer ${localStorage.usertoken}` },
    })
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

export const rentFilm = (values) => async (dispatch) => {
  axios
    .post(`${FILM_SERVICE_URI}/films/rentFilm`, values, {
      headers: { Authorization: `Bearer ${localStorage.usertoken}` },
    })
    .then((response) => {
      dispatch({ type: types.FILM_RENTED, payload: response.data });
    })
    .catch((err) => {
      dispatch({
        type: types.FILM_NOT_RENTED,
        payload: err,
      });
    });
};
