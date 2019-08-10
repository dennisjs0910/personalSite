import { AUTH_ACTION, CLEAR_ERROR } from "../actions/ActionTypes";

const initialState = {
  currentUser: null,
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
    case CLEAR_ERROR:
      return Object.assign({...state}, { error: null });
    default:
      return state;
  }
}