import { STORE_EMAIL } from "./types";

export const storeemail = (email) => async (dispatch) => {
  try {
    dispatch({
      type: STORE_EMAIL,
      payload: email,
    });
  } catch (error) {
    console.log("inside error of action");
  }
};
