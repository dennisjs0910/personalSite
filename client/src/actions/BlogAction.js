import axios from "axios";
// import { BLOG_ACTION } from "actions/ActionTypes";

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
}