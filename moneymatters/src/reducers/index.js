import { combineReducers } from "redux";
import recentexpense from "./recentexpense";
import auth from "./auth";
import storeemail from "./storeemail";
import storepredictedvalue from "./storepredictedvalue";

export default combineReducers({
  recentexpense,
  auth,
  storeemail,
  storepredictedvalue,
});
