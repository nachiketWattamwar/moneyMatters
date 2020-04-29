import { STORE_VALUE } from "../actions/types";
const initialState = {
  value: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log("inside payload ", payload);
  switch (type) {
    case STORE_VALUE:
      return {
        ...state,
        value: payload,
      };
    default:
      return state;
  }
}
