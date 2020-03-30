import axios from "axios";
import { SIGNUP_SUCCESS, SIGNUP_FAIL } from "./types";

// Signup User
export const signup = ({
	firstName,
	lastName,
	email,
	password
}) => async dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};

	const body = JSON.stringify({ firstName, lastName, email, password });

	try {
		const res = await axios.post("/api/users", body, config); //api call from nikhil

		dispatch({
			type: SIGNUP_SUCCESS,
			payload: res.data //contains token returned from backend
		});
		//api call for initial expenses data
	} catch (err) {
		/* error handling
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }
        */

		dispatch({
			type: SIGNUP_FAIL
		});
	}
};

//login
//load user
