import axios from "axios";
import { USER_ACTION, CLEAR_ERROR } from "./ActionTypes";

export default class UserAction {
  static registerUser = (data, history) => {
    return async (dispatch) => {
      try {
        await axios.post("/api/user", data);
        dispatch({
          type: USER_ACTION.REGISTER_SUCCESS,
        });
        history.push("/login");
      } catch (err) {
        dispatch({
          payload: { error: err.response.data },
          type: USER_ACTION.REGISTER_FAILURE,
        });
      }
    };
  };

  /**
   * Sends signal to BlogReducer.js to set error state to null
   * @return {Redux Action type}
   */
  static clearError = () => ({ type: CLEAR_ERROR });
};