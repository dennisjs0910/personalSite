import { combineReducers } from "redux";
import BlogReducer from "./BlogReducer";
import AuthReducer from "./AuthReducer";
import CommentReducer from "./CommentReducer";

const appReducer = combineReducers({
  blog: BlogReducer,
  auth: AuthReducer,
  comment: CommentReducer
});

export default (state, action) => {
  // if (action.type === AUTH_ACTION_TYPE.LOGOUT_SUCCESS ) {
  //   state = undefined;
  // }

  return appReducer(state, action)
}