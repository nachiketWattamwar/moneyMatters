import { combineReducers } from "redux";
import recentexpense from "./recentexpense";
import auth from "./auth";
import storeemail from "./storeemail";

export default combineReducers({
  recentexpense,
  auth,
  storeemail,
});
