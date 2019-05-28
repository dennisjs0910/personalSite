import axios from "axios";
import { BLOG_ACTION } from "actions/ActionTypes";

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
      console.log("somthing went wrong", err);
    }
  };

  /**
   * This static function is used to send data to `/api/blog` server api endpoint to store
   * information about the blog that is being created
   * @param  {Object} data [keys: tags, image_url, img-descprition, title]
   * @return {Function}    [async function to dispatch results to reducers]
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
           error: err
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
          error: err
        });
      }
    }
  }
}