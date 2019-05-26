import axios from "axios";
import { BLOG_ACTION } from "actions/ActionTypes";

export default class BlogAction {
  static postImage = async (file) => {
    const config= {
      "headers": {
        "content-type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s'
      }
    }

    try {
      const res = await axios.post(`/api/image-upload`, file, config);
      return res;
    } catch(err) {
      console.log(err);
    }

    // return {
    //   type: BLOG_ACTION.POST_IMAGE,
    //   payload: { isFetching: true }
    // }
  };
}