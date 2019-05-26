import { BLOG_ACTION } from "actions/ActionTypes";

const initialState = {
  images: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BLOG_ACTION.POST_IMAGE : {
      console.log("inside BLOG_ACTION", action.type);
      return state;
    }
    default:
      return state;
  }
}