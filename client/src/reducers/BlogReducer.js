import { BLOG_ACTION } from "actions/ActionTypes";

const initialState = {
  images: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BLOG_ACTION.CREATE_BLOG_SUCCESS : {
      console.log("inside", BLOG_ACTION.CREATE_BLOG_SUCCESS, action.payload);
      return state;
    }
    default:
      return state;
  }
}