import { combineReducers } from "redux";
import auth from "./auth";
import filmReducer from "./film";
const rootReducer = combineReducers({ auth, filmReducer });

export default rootReducer;
