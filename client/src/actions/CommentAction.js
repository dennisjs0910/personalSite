import axios from "axios";
import { BLOG_ACTION } from "./ActionTypes";

export default class CommentAction {

  static createComment = (data) => {
    console.log("from action yo",data);
     return async (dispatch) => {
       try {
         const res = await axios.post(`/api/blog/${data.blogPost_id}/comment`, data);
         dispatch({
           type: "nothing",
         });
       } catch (err) {
         dispatch({
           type: "nothing",
         });
       }
    }
  };

  static getComments = (blogPost_id) => {
    return async (dispatch) => {
      try{
        const res = await axios.get(`/api/blog/${blogPost_id}/comment?blogPostId=${blogPost_id}`, { blogPost_id });
        console.log(res);
        dispatch({
          type: "nothing",
        });
      } catch (err) {
        console.log(err);
        dispatch({
          type: "nothing",
        });
      }
    }
  };

  static updateComment = (data) => {
    return {};
    // return async (dispatch) => {
    //    try {
    //      let res = await axios.put(`/api/blog`, data);
    //      dispatch({
    //        type: BLOG_ACTION.UPDATE_BLOG_SUCCESS,
    //        payload: res.data
    //      });
    //    } catch (err) {
    //      dispatch({
    //        type: BLOG_ACTION.UPDATE_BLOG_FAILURE,
    //        error: { message: "Something went wrong updating your blog, please try again" }
    //      });
    //    }
    // }
  };

  static deleteComment = ({id}) => {
    return {};
    // return async (dispatch) => {
    //   try{
    //     await axios.delete(`/api/blog/${id}`);
    //     dispatch({
    //       type: BLOG_ACTION.DELETE_BLOG_SUCCESS,
    //       payload: { id }
    //     });
    //   } catch (err) {
    //     dispatch({
    //       type: BLOG_ACTION.DELETE_BLOG_FAILURE,
    //       error: null
    //     });
    //   }
    // }
  };
}