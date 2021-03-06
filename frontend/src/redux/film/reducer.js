import { types } from './action';

const initState = {
  addFilm: {
    successMsg: null,
    errorMsg: null,
  },
  filmList: {
    films: [],
    successMsg: null,
    errorMsg: null,
  },
  filmRent: {
    successMsg: null,
    errorMsg: null,
  },
};

export default function filmReducer(state = initState, action) {
  switch (action.type) {
    case types.FILM_ADDED:
      return {
        ...state,
        film: action.payload,
        addFilm: {
          ...state.addFilm,
          successMsg: 'Film Added',
        },
      };
    case types.FILM_NOT_ADDED:
      return {
        ...state,
        addFilm: {
          ...state.addFilm,
          errorMsg: 'Film not added , Something went wrong',
        },
      };
    case types.LIST_RETRIEVED:
      return {
        ...state,
        filmList: {
          ...state.filmList,
          films: action.payload,
          successMsg: 'List is okay',
        },
      };
    case types.LIST_NOT_RETRIEVED:
      return {
        ...state,
        filmList: {
          ...state.filmList,
          errorMsg: 'Error in getting the list',
        },
      };
    case types.FILM_RENTED:
      return {
        ...state,
        filmRent: {
          ...state.filmRent,
          successMsg: 'Film Rented',
        },
      };
    case types.FILM_NOT_RENTED:
      return {
        ...state,
        filmRent: {
          ...state.filmRent,
          errorMsg: 'Renting Failed',
        },
      };
    default:
      return state;
  }
}
