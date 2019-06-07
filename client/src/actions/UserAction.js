import axios from "axios";
import { USER_ACTION } from "./ActionTypes";

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
          type: USER_ACTION.REGISTER_FAILURE,
        });
      }
    };
  };
}