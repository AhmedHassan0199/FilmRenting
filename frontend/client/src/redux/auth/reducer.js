import { types, login } from "./action";
import jwt_decode from "jwt-decode";
const initState = {
  isAuthenticated: false,
  user: {},
  register: {
    data: null,
    successMsg: null,
    errorMsg: null,
  },
  login: {
    successMsg: null,
    errorMsg: null,
  },
};

export default function auth(state = initState, action) {
  console.log(action.type);
  switch (action.type) {
    case types.REGISTER:
      state.register.successMsg = action.payload;
      return state;
    case types.REGISTER_FAILURE:
      state.register.errorMsg = action.payload;
      return state;
    case types.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: jwt_decode(action.payload),
        login: { ...login, errorMsg: "Login successful" },
      };
    case types.LOGIN_FAILURE:
      console.log(action.payload);
      state.login.errorMsg = action.payload;
      return state;
    default:
      return state;
  }
}