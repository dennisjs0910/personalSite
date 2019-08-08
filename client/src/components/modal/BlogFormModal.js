import React, { Component } from 'react';
import { Button, TextArea, Input, Form, Modal, Dropdown, Label, Image } from 'semantic-ui-react'
import { isEqual } from 'lodash';

import { BlogAction } from '../../actions';
import { TitleForm, SummaryForm, TagsForm, UploadMediaForm, MediaTextAreaList } from '../form';

const INITIAL_STATE = {
  title: "",
  summary: "",
  tags: [],
  options: [], // used for tag dropdown options
  inputVisible: false,
  tagInputValue: '',
  fileList: [],
  mediaText: [], //TODO delete
  mediaList: [],
  filesToDelete: [],
  isPreviewVisible: false,
  previewImage: ""
};

class BlogFormModal extends Component {
  constructor(props) {
    super(props);

    const { blog, isVisible, isUpdate } = props;
    this.ogImageSet = new Set();
    this.tagSet = new Set();

    if (!!blog && isVisible && isUpdate) {
      this.tagSet = new Set(blog.category);
      const mediaFilesAndText = this._getFilesAndText(blog);
      this.state = {
        title: blog.title,
        summary: blog.summary,
        tags: [...blog.category],
        inputVisible: false,
        tagInputValue: '',
        filesToDelete: [],
        fileList: mediaFilesAndText.files,
        mediaText: mediaFilesAndText.texts
      };
    } else {
      this.state = INITIAL_STATE;
    }
  }

  _getFilesAndText = ({contents=[]}) => {
    let res = { files: [], texts: []};
    contents.forEach((content, idx) => {
      this.ogImageSet.add(content.public_id);
      res.files.push({
        uid: `${idx}`,
        name: `${idx}_image`,
        status: 'done',
        response: [{
          public_id: content.public_id,
          secure_url: content.media_url,
          resource_type: content.is_video ? "video" : "image"
        }]
      });
      res.texts.push(content.summary);
    });
    return res;
  };

  // handlePreviewCancel = () => this.setState({ isPreviewVisible: false });

  // handlePreview = file => {
  //   const url = (file.response && file.response.length === 1 && file.response[0].secure_url) || "";
  //   this.setState({
  //     previewImage: url,
  //     isPreviewVisible: true,
  //   });
  // };

  /**
   * When isUpdate=true and isSubmitted=false, it is a modal close so we do not delete original images
   * If it is sumbitted we delete all filesThat need to be deleted from cloudinary.
   * Otherwise, delete all media files from cloudinary.
   * @param  {Boolean} isSubmitted [description]
   * @return {[type]}              [description]
   */
  deleteUnusedImages = (isSubmitted) => {
    const { isUpdate } = this.props;
    // case: update blog closed modal
    if (isUpdate && !isSubmitted) {
      let idList = [];
      // put all files that were added to the idList O(n)
      this.state.fileList.forEach(file => {
        if (!this.ogImageSet.has(file.response[0].public_id)) {
          idList.push({
            public_id: file.response[0].public_id,
            resource_type: file.response[0].resource_type
          });
        }
      });

      // keep original files that belong to the blog and put others in idList O(n)
      this.state.filesToDelete.forEach(file => {
        if (!this.ogImageSet.has(file.public_id)) {
          idList.push({
            public_id: file.public_id,
            resource_type: file.resource_type
          });
        }
      });
      //delete all files in idList
      idList.forEach(file => BlogAction.deleteImage(file));
      return;
    };
    // case: update blog and submit, create blog and sumbit, create blog and close
    // for create we want to delete all files in filesToDelete since they don't belong to any content
    this.state.filesToDelete.forEach(file => BlogAction.deleteImage(file));

    // case: create blog and close, delete everything that is left.
    if (!isSubmitted) {
      this.state.fileList.forEach(file => {
        if (!!file.response) {
          BlogAction.deleteImage(file.response[0]);
        }
      });
    }
  };
  /**
   * When the user is clears the blog, we store all media files for future deletes.
   * @param  {Event} e
   */
  handleStateReset = (e) => {
    e.preventDefault();
    let initState = INITIAL_STATE;
    const moreFilesToDelete = this.state.fileList.map(file => ({
      public_id: file.response[0].public_id,
      resource_type: file.response[0].resource_type
    }));
    initState = Object.assign({...INITIAL_STATE}, { filesToDelete: [...moreFilesToDelete, ...this.state.filesToDelete]});
    this.setState(initState);
  };

  /**
   * Returns true if title of summary is an empty string
   */
  isSubmitDisabled = (title, summary) => {
    return title === "" || summary === "";
  };

  // Start of new code =============================================
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
      console.log(err);
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
    this.deleteRemovedMedia(this.state.mediaList[idx]);
    const mediaList = this.state.mediaList.filter((item, i) => i !== idx);
    this.setState({ mediaList });
  };


  deleteRemovedMedia = async (item) => {
    await BlogAction.deleteImage(item);
  };

  handleModalClose = (e, isSubmitted) => {
    this.deleteUnusedImages(isSubmitted);
    delete this.input;
    delete this.tagSet;
    delete this.ogImageSet;
    this.props.handleClose(null);
  };

  handleFormSubmit = e => {
    const { title, summary, tags, mediaList } = this.state;
    const { currentUser, handleSubmit, blog } = this.props;

    handleSubmit(Object.assign({
      title, summary, tags, mediaList, user_id: currentUser.id, blog
    }));

    this.handleModalClose(e, true);
  };

  render() {
    const { title, summary, tags, options, mediaList } = this.state;
    const { isVisible, handleClose } = this.props;

    return (
      <Modal open={ isVisible } >
        <Modal.Content>
          <Form>
            <TitleForm handleTextInputChange={ this.handleTextInputChange } />
            <SummaryForm handleTextInputChange={ this.handleTextInputChange } />
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
          <Button negative onClick={ handleClose }>Close</Button>
          <Button
            positive
            icon='checkmark'
            labelPosition='right'
            content='Submit'
            onClick={ this.handleFormSubmit }
          />
        </Modal.Actions>
      </Modal>
    );
  };
}

export default BlogFormModal;