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
      return Object.assign({...state}, { items: [action.payload.data, ...state.items] });
    }
    case COMMENT_ACTION.DELETE_COMMENT_SUCCESS : {
      const filteredComments = state.items.filter(item => item.id !== action.payload.id);
      return Object.assign({...state}, { items: [...filteredComments] });
    }
    case COMMENT_ACTION.DELETE_COMMENT_FAILURE :
    case COMMENT_ACTION.CREATE_COMMENT_FAILURE :
    case COMMENT_ACTION.GET_COMMENT_FAILURE :
    default:
      return state;
  }
}