import { COMMENT_ACTION } from "../actions/ActionTypes";

const initialState = {
  items: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COMMENT_ACTION.GET_COMMENT_SUCCESS: {
      return Object.assign({...state}, { items: action.payload.data });
    }
    case COMMENT_ACTION.CREATE_COMMENT_SUCCESS : {
      return state;
    }
    case COMMENT_ACTION.CREATE_COMMENT_FAILURE :
    case COMMENT_ACTION.GET_COMMENT_FAILURE :
    default:
      return state;
  }
}