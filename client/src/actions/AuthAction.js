import axios from "axios";
import { AUTH_ACTION } from "./ActionType";

export default class AuthAction {
  static loginUser = ({ email, password }) => {
    return async (dispatch) => {
      try {
        const res = await axios.post("/api/user/session", { email, password });
        dispatch({
          type: AUTH_ACTION.LOGIN_SUCCESS,
          payload: {
            current_user: res.data,
            hasLoggedIn: true
          }
        });
      } catch (err) {
        dispatch({
          type: AUTH_ACTION.LOGIN_FAILURE,
          payload: {
            err: err.response.data,
          }
        });
      }
    };
  };

  static logoutUser = (history) => {
    return async (dispatch) => {
      try {
        await axios.delete("/api/user/session");
        dispatch({
          type: AUTH_ACTION.LOGOUT_SUCCESS,
          payload: {
            current_user: null,
            hasLoggedIn: false
          }
        });
        history.push("/login");
      } catch (err) {
        dispatch({
          type: AUTH_ACTION.LOGOUT_FAILURE,
          payload: { err, isFetching: false }
        });
      }
    };
  };
}