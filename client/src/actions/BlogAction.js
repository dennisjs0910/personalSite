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

  /**
   * This static function is not used to data to the reducers. It will connect to backend server
   * to delete an image in Cloudinary.
   * @param  { String } publicId
   */
  static deleteImage = async ({ public_id, resource_type }) => {
    try {
      const res = await axios.delete(`/api/image-upload/`, { data: { public_id, resource_type } });
      return res;
    } catch(err) {
      throw err;
    }
  };

  /**
   * Creates and stores blogPost, and blogContents in database
   * @param  {Object} data           [data of blog to store in database]
   * @return { async function }      [fn for redux thunk]
   */
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

  /**
   * Todo: limit due to scalability and consider integrating redis
   * Retrives all blogs from database
   * @return { async function }      [fn for redux thunk]
   */
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

  /**
   * Deletes all media of blog from storage as well as delete them from database
   * @param  {Blog Object} blog
   * @return { async function }      [fn for redux thunk]
   */
  static deleteBlog = (blog) => {
    blog.contents.forEach(content => this.deleteImage({
      public_id: content.public_id,
      resource_type: content.is_video ? 'video' : 'image'
    }));

    return async (dispatch) => {
      try{
        await axios.delete(`/api/blog/${blog.id}`);
        dispatch({
          type: BLOG_ACTION.DELETE_BLOG_SUCCESS,
          payload: { id: blog.id }
        });
      } catch (err) {
        dispatch({
          type: BLOG_ACTION.DELETE_BLOG_FAILURE,
          payload: { error : err.response.data }
        });
      }
    }
  };
}