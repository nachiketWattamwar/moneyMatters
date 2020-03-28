import { combineReducers } from "redux";
import recentexpense from "./recentexpense";
import auth from "./auth";

export default combineReducers({
	recentexpense,
	auth
});
