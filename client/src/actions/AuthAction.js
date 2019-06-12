import axios from "axios";
import { AUTH_ACTION } from "./ActionTypes";

export default class AuthAction {
  static checkUser = () => {
    return async (dispatch) => {
      try {
        const res = await axios.get("/api/user/session");
        dispatch({
          type: AUTH_ACTION.LOGIN_SUCCESS,
          payload: {
            currentUser: res.data && res.data.user,
            hasLoggedIn: true,
            error: null
          }
        });
      } catch (err) {
        dispatch({
          type: AUTH_ACTION.LOGIN_FAILURE,
          payload: { error: null }
        });
      }
    };
  };

  static loginUser = ({ email, password }, history) => {
    return async (dispatch) => {
      try {
        const res = await axios.post("/api/user/session", { email, password });
        dispatch({
          type: AUTH_ACTION.LOGIN_SUCCESS,
          payload: {
            currentUser: res.data && res.data.user,
            hasLoggedIn: true,
            error: null
          }
        });
        history.push("/");
      } catch (err) {
        dispatch({
          type: AUTH_ACTION.LOGIN_FAILURE,
          payload: { error: err.response.data }
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
            currentUser: null,
            hasLoggedIn: false,
            error: null
          }
        });
        history.push("/login");
      } catch (err) {
        dispatch({
          type: AUTH_ACTION.LOGOUT_FAILURE,
          payload: {
            currentUser: null,
            hasLoggedIn: false,
            error: null
          }
        });
      }
    };
  };

}