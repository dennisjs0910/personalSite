import { BLOG_ACTION } from "../actions/ActionTypes";

const initialState = {
  items: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BLOG_ACTION.CREATE_BLOG_SUCCESS : {
      const { items } = state;
      return Object.assign({...state}, { items: [...items, action.payload.data[0]] });
    }
    case BLOG_ACTION.FETCH_BLOG_SUCCESS:
      return Object.assign({...state}, { items: action.payload.data });
    case BLOG_ACTION.CREATE_BLOG_FAILURE:
    case BLOG_ACTION.FETCH_BLOG_FAILURE:
      return state;
    default:
      return state;
  }
}