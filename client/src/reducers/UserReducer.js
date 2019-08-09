import { USER_ACTION } from "../actions/ActionTypes";

const initialState = {
  error: null,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case USER_ACTION.REGISTER_FAILURE:
      return Object.assign({...state}, { error: action.payload.error });
    default:
      return Object.assign({...state}, { error: null });
  }
};