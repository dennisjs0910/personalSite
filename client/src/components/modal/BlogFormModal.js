import React, { Component } from 'react';
import { BlogAction } from '../../actions';
import { TitleForm, SummaryForm, TagsForm, UploadMediaForm, MediaTextAreaList } from '../form';
import { Button, TextArea, Input, Form, Modal, Dropdown, Label, Image, Confirm } from 'semantic-ui-react'

class BlogFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      summary: "",
      tags: [],
      options: [], // used for tag dropdown options
      mediaList: [],
      isConfirmOpen: false,
    };
  }

  /**
   * Returns true if title of summary is an empty string
   */
  isSubmitDisabled = (title, summary) => {
    return title === "" || summary === "";
  };

  /**
   * When tag is added it updates state's option as well.
   * @param  {Event} e             [Javascript event object]
   * @param  {String} options.value [Tag added by user input]
   */
  handleTagAddition = (e, { value }) => {
    const { options } = this.state;
    this.setState({
      options: [ {text: value, value}, ... options ]
    });
  };

  /**
   * If tag is added, update state.tags otherwise filter removed tag from options
   * @param  {Event} e                [Javascript Event Object]
   * @param  {String[]} options.value [Array of user input tags]
   */
  handleTagChange = (e, { value }) => {
    const { tags, options } = this.state;
    if (tags.length > value.length) {
      const keySet = new Set(value);
      const filteredOptions = this.state.options.filter(item => keySet.has(item.value));
      this.setState({
        tags: value,
        options: filteredOptions
      });
    } else {
      this.setState({ tags: value });
    }
  };

  /**
   * Custom Request to upload an image to Cloudinary and { secure_url, public_id } to insertMediaItem fn
   * @param  {file} file                [User upload file]
   */
  handleMediaUpload = async (file) => {
    try {
      let data = new FormData();
      data.append('file', file);
      const imageRes = await BlogAction.postImage(data);
      this.insertMediaItem(imageRes.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * makes public_id, secure_url, text into an object and store inside state.mediaList
   * @param  {String} options.public_id  [Image Response public id]
   * @param  {String} options.secure_url [Image Response secure (https) url]
   */
  insertMediaItem = ({ public_id, secure_url, resource_type }) => {
    const { mediaList } = this.state;
    this.setState({
      mediaList: [...mediaList, { public_id, media_url : secure_url, summary: "", resource_type }]
    });
  };

  /**
   * This function store appropriate values to this.state[key]
   * @param  {String} options.value [value of user input]
   * @param  {String} key           [dynamic object key from input type]
   */
  handleTextInputChange = ({ value }, key) => {
    this.setState({ [key] : value });
  };

  /**
   * Handles media item's text change and updates state.medialist accordingly.
   * @param  {Event} e              [Javascript Event Object]
   * @param  {String} options.value [User input value]
   * @param  {Integer} idx          [Index of where media item is located in mediaList array]
   */
  handleMediaTextChange = (e, { value }, idx) => {
    if (0 <= idx && idx < this.state.mediaList.length) {
      let mediaList = this.state.mediaList;
      mediaList[idx].summary = value;
      this.setState({ mediaList });
    }
  };

  /**
   * This function deletes media that is removed, and deletes it from storage. Also update state.mediaList
   * @param  {Integer} idx [index of the item to be deleted]
   */
  handleMediaRemove = (idx) => {
    this.deleteMedia(this.state.mediaList[idx]);
    const mediaList = this.state.mediaList.filter((item, i) => i !== idx);
    this.setState({ mediaList });
  };

  /**
   * Deletes removed media from storage
   * @param  {Media Object} item
   */
  deleteMedia = async (item) => {
    BlogAction.deleteImage(item);
  };

  /**
   * if not submitted and closing, remove all media content from storage
   * @param  {Boolean} isSubmitted [is modal closing beause it was submitted]
   */
  handleModalClose = (isSubmitted) => {
    if (!isSubmitted) {
      this.state.mediaList.forEach(item => this.deleteMedia(item) );
    }
    this.props.handleClose(null);
  };

  /**
   * Opens and closes blog close confirm popup
   */
  handleConfirmVisibility = () => {
    this.setState({ isConfirmOpen : !this.state.isConfirmOpen });
  };

  /**
   * Gets all user input and send data through props.handleSubmit fn and close modal
   * @param  {Event} e
   */
  handleFormSubmit = e => {
    const { title, summary, tags, mediaList } = this.state;
    const { currentUser, handleSubmit, blog } = this.props;

    handleSubmit(Object.assign({
      title, summary, tags, mediaList, user_id: currentUser.id, blog
    }));

    this.handleModalClose(true);
  };

  render() {
    const { title, summary, tags, options, mediaList, isConfirmOpen } = this.state;
    const { isVisible, handleClose } = this.props;

    return (
      <Modal open={ isVisible } >
        <Modal.Content>
          <Form>
            <TitleForm handleTextInputChange={ this.handleTextInputChange } value={ title } />
            <SummaryForm handleTextInputChange={ this.handleTextInputChange } value={ summary }/>
            <TagsForm
              options={ options }
              tags={ tags }
              handleTagAddition={ this.handleTagAddition.bind(this) }
              handleTagChange={ this.handleTagChange.bind(this) }
            />
            <UploadMediaForm handleFileUpload={ this.handleMediaUpload.bind(this) }/>
            <MediaTextAreaList
              mediaList={ mediaList }
              handleMediaTextChange={ this.handleMediaTextChange.bind(this) }
              handleMediaRemove={ this.handleMediaRemove.bind(this) }
            />
          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button
            negative
            content="Close"
            onClick={ this.handleConfirmVisibility }
          />
          <Button
            disabled={ this.isSubmitDisabled(title, summary) }
            positive
            icon='checkmark'
            labelPosition='right'
            content='Submit'
            onClick={ this.handleFormSubmit }
          />
        </Modal.Actions>
        <Confirm
          content='Are you sure you want to close? Blog will not be saved.'
          open={ isConfirmOpen }
          confirmButton={<Button negative content="Yes"/>}
          cancelButton={<Button content="No" />}
          onCancel={ this.handleConfirmVisibility }
          onConfirm={(e) => this.handleModalClose(false) }
        />
      </Modal>
    );
  };
}

export default BlogFormModal;