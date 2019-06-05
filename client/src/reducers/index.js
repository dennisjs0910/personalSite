import { combineReducers } from "redux";
import BlogReducer from "./BlogReducer";
import AuthReducer from "./AuthReducer";

const appReducer = combineReducers({
  blog: BlogReducer,
  auth: AuthReducer,
});

export default (state, action) => {
  // if (action.type === AUTH_ACTION_TYPE.LOGOUT_SUCCESS ) {
  //   state = undefined;
  // }

  return appReducer(state, action)
}