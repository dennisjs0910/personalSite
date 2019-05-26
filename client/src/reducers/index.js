import { combineReducers } from "redux";
import BlogReducer from "./BlogReducer";

const appReducer = combineReducers({
  blog: BlogReducer
});

export default (state, action) => {
  // if (action.type === AUTH_ACTION_TYPE.LOGOUT_SUCCESS ) {
  //   state = undefined;
  // }

  return appReducer(state, action)
}