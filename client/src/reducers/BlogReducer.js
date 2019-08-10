import { BLOG_ACTION, CLEAR_ERROR } from "../actions/ActionTypes";

const initialState = {
  items: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BLOG_ACTION.FETCH_BLOG_SUCCESS:
      return Object.assign({...state}, { items: action.payload.data, error: null });
    case BLOG_ACTION.CREATE_BLOG_SUCCESS : {
      const { items } = state;
      return Object.assign({...state}, { items: [ action.payload.data,  ...items ], error: null });
    }
    case BLOG_ACTION.UPDATE_BLOG_SUCCESS : {
      const items = state.items.map(item => item.id === action.payload.data.id ? action.payload.data : item);
      return Object.assign({...state}, { items, error: null });
    }
    case BLOG_ACTION.DELETE_BLOG_SUCCESS: {
      const items = state.items.filter(item => {
        return item.id !== action.payload.id
      });
      return Object.assign({...state}, { items, error: null });
    }
    case BLOG_ACTION.CREATE_BLOG_FAILURE:
    case BLOG_ACTION.FETCH_BLOG_FAILURE:
    case BLOG_ACTION.UPDATE_BLOG_FAILURE:
    case BLOG_ACTION.DELETE_BLOG_FAILURE: {
      return Object.assign({...state}, { ...action.payload });
    }
    case CLEAR_ERROR:
      return Object.assign({...state}, { error: null });
    default:
      return state;
  }
}