import axios from "axios";
import { BLOG_ACTION } from "./ActionTypes";

export default class CommentAction {

  static createComment = (data) => {
     return async (dispatch) => {
       try {
         let res = await axios.post(`/api/blog`, data);
         dispatch({
           type: BLOG_ACTION.CREATE_BLOG_SUCCESS,
           payload: res.data
         });
       } catch (err) {
         dispatch({
           type: BLOG_ACTION.CREATE_BLOG_FAILURE,
           error: { message: "Something went wrong creating your blog, please try again" }
         });
       }
    }
  };

  static getComments = () => {
    return {};
    // return async (dispatch) => {
    //   try{
    //     let res = await axios.get(`/api/blog`);
    //     dispatch({
    //       type: BLOG_ACTION.FETCH_BLOG_SUCCESS,
    //       payload: res.data
    //     });
    //   } catch (err) {
    //     dispatch({
    //       type: BLOG_ACTION.FETCH_BLOG_FAILURE,
    //       error: { message: "An error occured, please try again and refresh the page" }
    //     });
    //   }
    // }
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