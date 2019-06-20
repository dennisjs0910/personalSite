import axios from "axios";
import { COMMENT_ACTION } from "./ActionTypes";

export default class CommentAction {
  static createComment = (data) => {
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
        const endpoint = `/api/blog/${blogPost_id}/comment?blogPostId=${blogPost_id}`;
        const res = await axios.get(endpoint, { blogPost_id });
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

  static deleteComment = (blogPost_id, id) => {
    return async (dispatch) => {
      try{
        const endpoint = `/api/blog/${blogPost_id}/comment`;
        const res = await axios.delete(endpoint,  { data: { id } });
        dispatch({
          type: COMMENT_ACTION.DELETE_COMMENT_SUCCESS,
          payload: { id }
        });
      } catch (err) {
        dispatch({
          type: COMMENT_ACTION.DELETE_COMMENT_FAILURE
        });
      }
    }
  };
}