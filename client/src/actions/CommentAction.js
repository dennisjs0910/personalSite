import axios from "axios";
import { COMMENT_ACTION } from "./ActionTypes";

export default class CommentAction {
  static createComment = (data) => {
    console.log("from action yo",data);
     return async (dispatch) => {
       try {
         const res = await axios.post(`/api/blog/${data.blogPost_id}/comment`, data);
         dispatch({
           type: COMMENT_ACTION.CREATE_COMMENT_SUCCESS,
           payload: res.data
         });
       } catch (err) {
         dispatch({
           type: COMMENT_ACTION.CREATE_COMMENT_FAILURE,
         });
       }
    }
  };

  static getComments = (blogPost_id) => {
    return async (dispatch) => {
      try{
        const res = await axios.get(`/api/blog/${blogPost_id}/comment?blogPostId=${blogPost_id}`, { blogPost_id });
        dispatch({
          type: COMMENT_ACTION.GET_COMMENT_SUCCESS,
          payload: res.data
        });
      } catch (err) {
        dispatch({
          type: COMMENT_ACTION.GET_COMMENT_FAILURE
        });
      }
    }
  };

  static updateComment = (data) => {
    return {};
  };

  static deleteComment = ({id}) => {
    return {};
  };
}