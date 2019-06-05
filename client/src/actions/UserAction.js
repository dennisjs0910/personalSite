import axios from "axios";
import { USER_ACTION } from "./ActionTypes";

// TODO: change uri /api/user/register to /api/user
export default class UserAction {
  static registerUser = (data, history) => {
    return async (dispatch) => {
      try {
        const res = await axios.post("/api/user", data);
        console.log(res);
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