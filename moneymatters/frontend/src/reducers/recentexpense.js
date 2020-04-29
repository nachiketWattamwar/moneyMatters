import { GET_RECENT_EXPENSE, GET_RECENT_EXPENSES_FIVE } from "../actions/types";

const initialState = {
  allData: null,
  recentExpensesFive: [],
  email: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log("indie type", type);
  console.log("inside payload ", payload);
  switch (type) {
    case GET_RECENT_EXPENSE:
      return {
        ...state,
        recentExpense: payload,
      };
    case GET_RECENT_EXPENSES_FIVE:
      return {
        ...state,
        recentExpensesFive: payload,
      };
    default:
      return state;
  }
}
