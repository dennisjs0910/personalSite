import React, { Component } from 'react';
import { TextArea, Form, Image, Container, Button } from 'semantic-ui-react'
import './MediaInputBox.css';

const VIDEO = 'video';

const MediaContainer = ({ item }) => {
  if (item.resource_type === VIDEO) {
    return (
      <video className='media-input-box-media' controls>
        <source src={ item.media_url } type="video/mp4"/>
      </video>
    );
  } else {
    return (<Image centered className='media-input-box-media' src={ item.media_url }/>);
  }
}

class MediaInputBox extends Component {
  render() {
    const { item, idx, handleMediaTextChange, handleMediaRemove } = this.props;
    return(
      <Form.Field >
        <label>Media Summary</label>
        <div className='media-input-box-container'>
          <MediaContainer item={ item }/>
          <TextArea
            className='media-input-box-textarea'
            onChange={(e, data) => handleMediaTextChange(e, data, idx) }
            value={ item.summary }
          />
          <Button negative onClick={ () => handleMediaRemove(idx) }>Remove</Button>
        </div>
      </Form.Field>
    );
  };
}

export default MediaInputBox;