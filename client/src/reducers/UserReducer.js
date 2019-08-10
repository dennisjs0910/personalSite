import { USER_ACTION, CLEAR_ERROR } from "../actions/ActionTypes";

const initialState = {
  error: null,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case USER_ACTION.REGISTER_FAILURE:
      return Object.assign({...state}, { ...action.payload });
    case CLEAR_ERROR:
      return Object.assign({...state}, { error: null });
    default:
      return state;
  }
};