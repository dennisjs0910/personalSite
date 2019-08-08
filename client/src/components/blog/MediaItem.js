import React, { Component } from 'react';
import { Image } from 'semantic-ui-react'

export default class MediaItem extends Component {
  render() {
    const { content } = this.props;
    if (!content) return null;
    if (content.is_video) {
      return (
        <video controls className="blog-item-media">
          <source src={ content.media_url } type="video/mp4"/>
        </video>
      );
    } else {
      return (<Image className="blog-item-media" src={ content.media_url } />);
    }
  }
}