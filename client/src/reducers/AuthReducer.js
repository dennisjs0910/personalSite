import { AUTH_ACTION } from "../actions/ActionTypes";

const initialState = {
  current_user: null,
  hasLoggedIn: false,
  error: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case AUTH_ACTION.LOGIN_SUCCESS:
    case AUTH_ACTION.LOGIN_FAILURE:
    case AUTH_ACTION.LOGOUT_SUCCESS:
    case AUTH_ACTION.LOGOUT_FAILURE:
      return Object.assign({...state}, {...action.payload});
    default:
      return state;
  }
}