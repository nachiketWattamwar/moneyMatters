import { STORE_VALUE } from "./types";

export const storepredictedvalue = (value) => (dispatch) => {
  try {
    dispatch({
      type: STORE_VALUE,
      payload: value,
    });
  } catch (error) {
    console.log("inside error of action storevalue");
  }
};
