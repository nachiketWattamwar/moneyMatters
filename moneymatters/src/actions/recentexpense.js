import axios from "axios";

import { GET_RECENT_EXPENSE, GET_RECENT_EXPENSES_FIVE } from "./types";

export const getRecentExpense = () => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:3001/api`);

    dispatch({
      type: GET_RECENT_EXPENSE,
      payload: res.data
    });
  } catch (error) {
    console.log("inside error of action");
  }
};

export const getRecentExpensesFive = () => async dispatch => {
  console.log("Inside recent 5");
  try {
    const res = await axios.get(`http://localhost:3001/recentFiveExpenses`);

    dispatch({
      type: GET_RECENT_EXPENSES_FIVE,
      payload: res.data
    });
  } catch (error) {
    console.log("inside error of action");
  }
};
