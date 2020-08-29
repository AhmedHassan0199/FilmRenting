import { types } from "./action";
import jwt_decode from "jwt-decode";

const initState = {
  isAuthenticated: false,
  user: {},
  film: {},
  register: {
    data: null,
    successMsg: null,
    errorMsg: null,
  },
  login: {
    successMsg: null,
    errorMsg: null,
  },
  addFilm: {
    successMsg: null,
    errorMsg: null,
  },
};

export default function auth(state = initState, action) {
  switch (action.type) {
    case types.REGISTER:
      return {
        ...state,
        register: { ...state.register, successMsg: "Registered successfully" },
      };
    case types.REGISTER_FAILURE:
      var str = action.payload;
      console.log(str);
      var ErrorMsg;
      if (JSON.stringify(str).includes("409")) {
        ErrorMsg = "Username Already Exists";
      } else {
        ErrorMsg = "Something Went Wrong , please try again";
      }
      return {
        ...state,
        register: { ...state.register, errorMsg: ErrorMsg },
      };
    case types.LOGIN:
      localStorage.setItem("usertoken", action.payload);
      var userdata = jwt_decode(action.payload);
      return {
        ...state,
        isAuthenticated: true,
        user: userdata,
        login: { ...state.login, successMsg: "Login successful" },
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        login: { ...state.login, errorMsg: "Incorrect Username or password" },
      };
    case types.FILM_ADDED:
      return {
        ...state,
        film: action.payload,
        addFilm: {
          ...state.addingFilm,
          successMsg: "Film Added",
        },
      };
    case types.FILM_NOT_ADDED:
      return {
        ...state,
        addFilm: {
          ...state.addingFilm,
          errorMsg: "Film not added , Something went wrong",
        },
      };

    default:
      return state;
  }
}
