import axios from "axios";
import { AUTH_ACTION } from "./ActionTypes";

// TODO: change uri /api/user to /api/user/session
export default class AuthAction {
  static loginUser = ({ email, password }, history) => {
    return async (dispatch) => {
      try {
        const res = await axios.post("/api/user", { email, password });
        dispatch({
          type: AUTH_ACTION.LOGIN_SUCCESS,
          payload: {
            current_user: res.data && res.data.user,
            hasLoggedIn: true,
            error: null
          }
        });
        history.push("/");
      } catch (err) {
        dispatch({
          type: AUTH_ACTION.LOGIN_FAILURE,
          payload: { err: err.response.data }
        });
      }
    };
  };

  static logoutUser = (history) => {
    return async (dispatch) => {
      try {
        await axios.delete("/api/user");
        dispatch({
          type: AUTH_ACTION.LOGOUT_SUCCESS,
          payload: {
            current_user: null,
            hasLoggedIn: false,
            error: null
          }
        });
        history.push("/login");
      } catch (err) {
        dispatch({
          type: AUTH_ACTION.LOGOUT_FAILURE,
          payload: { err: err.response.data }
        });
      }
    };
  };
}