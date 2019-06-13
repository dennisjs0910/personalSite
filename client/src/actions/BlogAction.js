import axios from "axios";
import { BLOG_ACTION } from "./ActionTypes";

export default class BlogAction {
  /**
   * This static function is not used to data to the reducers. It will connect to backend server
   * to post an image to Cloudinary and recieve a secure url that is used in the future to store contents.
   * @param  { FormData } file [file containing the media img/video]
   * @return {[type]}      [description]
   */
  static postImage = async (file) => {
    const config= { "headers": { "content-type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s' } };
    try {
      const res = await axios.post(`/api/image-upload`, file, config);
      return res;
    } catch(err) {
      throw err;
    }
  };

  static deleteImage = async (file) => {
    try {
      const publicId = "ykuj1dlvwxhppkcczq2f";
      const res = await axios.delete(`/api/image-upload/${publicId}`);
      return res;
    } catch(err) {
      console.log(err);
      throw err;
    }
  }

  static createBlog = (data) => {
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

  static getBlogs = () => {
    return async (dispatch) => {
      try{
        let res = await axios.get(`/api/blog`);
        dispatch({
          type: BLOG_ACTION.FETCH_BLOG_SUCCESS,
          payload: res.data
        });
      } catch (err) {
        dispatch({
          type: BLOG_ACTION.FETCH_BLOG_FAILURE,
          error: { message: "An error occured, please try again and refresh the page" }
        });
      }
    }
  };

  static updateBlog = (data) => {
    return async (dispatch) => {
       try {
         let res = await axios.put(`/api/blog`, data);
         dispatch({
           type: BLOG_ACTION.UPDATE_BLOG_SUCCESS,
           payload: res.data
         });
       } catch (err) {
         dispatch({
           type: BLOG_ACTION.UPDATE_BLOG_FAILURE,
           error: { message: "Something went wrong updating your blog, please try again" }
         });
       }
    }
  };

  static deleteBlog = ({id}) => {
    return async (dispatch) => {
      try{
        await axios.delete(`/api/blog/${id}`);
        dispatch({
          type: BLOG_ACTION.DELETE_BLOG_SUCCESS,
          payload: { id }
        });
      } catch (err) {
        dispatch({
          type: BLOG_ACTION.DELETE_BLOG_FAILURE,
          error: null
        });
      }
    }
  };
}