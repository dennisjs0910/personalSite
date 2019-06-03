import { BLOG_ACTION } from "../actions/ActionTypes";

const initialState = {
  items: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BLOG_ACTION.CREATE_BLOG_SUCCESS : {
      const { items } = state;
      console.log("data", action.payload.data);

      return Object.assign({...state}, { items: [...items, action.payload.data[0]] });
    }

    case BLOG_ACTION.FETCH_BLOG_SUCCESS : {
      // console.log("inside", BLOG_ACTION.FETCH_BLOG_SUCCESS, action.payload.data);
      return Object.assign({...state}, { items: action.payload.data });
    }
    default:
      return state;
  }
}