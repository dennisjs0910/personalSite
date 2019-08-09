import { combineReducers } from "redux";
import BlogReducer from "./BlogReducer";
import AuthReducer from "./AuthReducer";
import CommentReducer from "./CommentReducer";
import UserReducer from "./UserReducer";

const appReducer = combineReducers({
  blog: BlogReducer,
  auth: AuthReducer,
  comment: CommentReducer,
  user: UserReducer
});

export default (state, action) => {
  // if (action.type === AUTH_ACTION_TYPE.LOGOUT_SUCCESS ) {
  //   state = undefined;
  // }

  return appReducer(state, action)
}