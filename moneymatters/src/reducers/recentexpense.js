import { GET_RECENT_EXPENSE } from "../actions/types";

const initialState = {
  recentExpense: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_RECENT_EXPENSE:
      return {
        ...state,
        recentExpense: payload
      };
    default:
      return state;
  }
}
