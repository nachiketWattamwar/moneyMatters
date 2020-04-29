import { STORE_EMAIL } from "../actions/types";
const initialState = {
  email: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log("indie type", type);
  console.log("inside payload ", payload);
  switch (type) {
    case STORE_EMAIL:
      return {
        ...state,
        email: payload,
      };
    default:
      return state;
  }
}
