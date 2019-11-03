import axios from "axios";

import { GET_RECENT_EXPENSE } from "./types";

export const getRecentExpense = () => async dispatch => {
  try {
    console.log("===============before axios call");
    const res = await axios.get(`http://localhost:3001/api`);
    console.log(
      "==================================after axios call=======",
      res
    );
    dispatch({
      type: GET_RECENT_EXPENSE,
      payload: res.data
    });
  } catch (error) {
    console.log("inside error of action");
  }
};
