import React, { Component } from 'react';
import { TextArea, Form, Image, Container, Button, Confirm } from 'semantic-ui-react'
import './MediaTextArea.css';

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

class MediaTextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  };

  handleConfirmVisibility = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleConfirm = () => {
    const { idx, handleMediaRemove } = this.props;
    this.setState({ isOpen: false });
    handleMediaRemove(idx);
  };

  render() {
    const { item, idx, handleMediaTextChange, handleMediaRemove } = this.props;
    const { isOpen } = this.state;
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
          <Button negative onClick={ this.handleConfirmVisibility.bind(this) }>Remove</Button>
        </div>
        <Confirm
          content="Media and summary will be removed, are you sure?"
          open={ isOpen }
          confirmButton={<Button negative content="Yes" />}
          cancelButton={<Button content="No" />}
          onCancel={ this.handleConfirmVisibility.bind(this) }
          onConfirm={ this.handleConfirm.bind(this) }
        />
      </Form.Field>
    );
  };
}

export default MediaTextArea;