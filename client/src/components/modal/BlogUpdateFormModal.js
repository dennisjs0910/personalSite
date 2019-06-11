import React, { Component } from 'react';
import { Modal, Button, Form, Input, Tag, Icon, Upload  } from 'antd';
import { BlogAction } from '../../actions';
import { isEqual } from 'lodash';
import "./BlogModal.css";

const INITIAL_STATE = {
  title: "", //required
  summary: "", //required
  tags: [],
  inputVisible: false,
  tagInputValue: '',
  fileList: [],
  mediaText: []
};


class BlogUpdateFormModal extends Component {
  constructor(props) {
    super(props);

    const { blog, isVisible } = props;
    if (!!blog && isVisible) {
      const mediaFilesAndText = this._getFilesAndText(blog);
      this.tagSet = new Set(blog.category);
      this.state = {
        title: blog.title,
        summary: blog.summary,
        tags: [...blog.category],
        inputVisible: false,
        tagInputValue: '',
        fileList: mediaFilesAndText.files,
        mediaText: mediaFilesAndText.texts
      };
    } else {
      this.tagSet = new Set();
      this.state = INITIAL_STATE;
    }

    this.renderTagForm = this.renderTagForm.bind(this);
    this.renderMediaContentForm = this.renderMediaContentForm.bind(this);
  }

  _getFilesAndText = ({contents=[]}) => {
    let res = { files: [], texts: []};
    contents.forEach((content, idx) => {
      res.files.push({
        uid: `${idx}`,
        name: `${idx}_image`,
        status: 'done',
        url: content.media_url
      });
      res.texts.push(content.summary);
    });

    return res;
  };

  /**
   * Custom Request to upload an image to Cloudinary.
   * It is used to obtain a secure url to pass to the server in the future.
   * When it is successful
   * @param  { File } file
   * @param  { callback fn } onSuccess
   * @param  { callback fn } onError (currently removed)
   */
  uploadImageToCloudinary = async ({ file, onSuccess, onError }) => {
    try {
      let data = new FormData();
      data.append('file', file);
      const imageRes = await BlogAction.postImage(data);
      this.addTextBox();
      onSuccess(imageRes.data, file);
    } catch(err) {
      onError(err);
    }
  };

  saveInputRef = input => (this.input = input);

  /**
   * This function is used to add tags, once user clicks on
   * "+ New Tag" it will set input to be visible.
   */
  showTagInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  /**
   * Returns true if title of summary is an empty string
   */
  isSubmitDisabled = (title, summary) => {
    return title === "" || summary === "";
  };

  handleModalClose = (e) => {
    e.preventDefault();
    const { handleClose } = this.props;
    this.setState(INITIAL_STATE);
    delete this.input;
    delete this.tagSet;
    handleClose(e);
  };

  /**
   * This function adds a new tag to the list of tags if tagInput is unique.
   * Also we reset the inputValue and unfocus the input.
   */
  handleInputConfirm = () => {
    const { tagInputValue, tags } = this.state;

    if (!this.tagSet.has(tagInputValue)) {
      this.tagSet.add(tagInputValue);
      this.setState({
        tags: [...tags, tagInputValue],
        inputVisible: false,
        tagInputValue: '',
      });
    } else {
      this.setState({
        inputVisible: false,
        tagInputValue: '',
      });
    }
  };

  /**
   * Handle close is used to remove a tag user have added
   * @param  {String} removedTag [Tag name to be deleted]
   */
  handleTagClose = removedTag => {
    const tags = this.state.tags.filter(tag =>  tag !== removedTag );
    this.tagSet.delete(removedTag);
    this.setState({ tags });
  };

  handleMediaTextChange = ({ target }) => {
    const idx = (target.dataset && target.dataset.id) || -1;
    const { value } = target;
    if (idx >= 0) {
      let mediaText = [...this.state.mediaText];
      mediaText[idx] = value;
      this.setState({ mediaText });
    }
  };

  /**
   * This function removes file from fileList as well as mediaText located in the same index
   * @param  {Object} file [file to be removed]
   */
  handleMediaRemove = (file) => {
    const { fileList, mediaText } = this.state;
    let idx = -1;
    let modifiedFileList = fileList.filter((f, i) => {
      if (isEqual(file, f)) {
        idx = i;
        return false;
      }
      return true;
    });

    const removalText = idx === -1 ? "" : mediaText[idx];
    let modifiedTexts = mediaText.filter(text => text !== removalText);

    this.setState({
      fileList: modifiedFileList,
      mediaText: modifiedTexts
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title, summary, tags, fileList, mediaText } = this.state;
    const { currentUser, updateBlog } = this.props;
    updateBlog(Object.assign({
      title, summary, tags, fileList, mediaText, user_id: currentUser.id
    }));

    this.handleModalClose(e);
  };

  handleMediaChange = ({ fileList }) => this.setState({ fileList });

  /**
   * This function sets the input value to what the user is typing.
   * @param  {Event Object} e
   */
  handleTextInputChange = ({target}, key) => {
    this.setState({ [key]: target.value });
  };

  addTextBox = () => {
    const { mediaText } = this.state;
    this.setState({
      mediaText: [...mediaText, ""]
    });
  };

  renderTagForm() {
    const { inputVisible, tagInputValue, tags } = this.state;
    return(
      <Form.Item label="Tags">
        { this.renderTagInput(inputVisible, tagInputValue) }
        <div>
          { tags.map(tag =>
            <Tag
              closable
              onClose={() => this.handleTagClose(tag) }
              key={tag}
            >
              {tag}
            </Tag>
          )}
        </div>
      </Form.Item>
    );
  };

  renderTagInput(inputVisible, tagInputValue) {
    if (inputVisible) {
      return(
        <Input
          ref={ this.saveInputRef }
          type="text"
          size="small"
          value={ tagInputValue }
          onChange={(e) => this.handleTextInputChange(e, "tagInputValue") }
          onBlur={ this.handleInputConfirm }
          onPressEnter={ this.handleInputConfirm }
        />);
    } else {
      return(
        <Tag
          className="bp-form-add-new-tag"
          onClick={ this.showTagInput }
        >
          <Icon type="plus" /> New Tag
        </Tag>
      );
    }
  };

  renderMediaContentForm() {
    const { fileList } = this.state;
    return(
      <Form.Item label="Media">
        <h6>Only able to support one video and one image</h6>
        <Upload
          className='upload-list-inline'
          customRequest={ this.uploadImageToCloudinary }
          onChange={ this.handleMediaChange }
          fileList={ fileList }
          onRemove={ this.handleMediaRemove }
        >
          <Button>
            <Icon type="upload" /> Upload
          </Button>
        </Upload>
      </Form.Item>
    )
  };

  renderTitleForm(title) {
    return(
      <Form.Item label="Blog Title">
        <Input value={title} onChange={(e) => this.handleTextInputChange(e, "title") }>
        </Input>
      </Form.Item>
    );
  };

  renderBlogSummaryForm(summary) {
    return(
      <Form.Item label="Summary">
        <Input.TextArea value={summary} onChange={(e) => this.handleTextInputChange(e, "summary") }>
        </Input.TextArea>
      </Form.Item>
    );
  }

  renderInputTextBoxes() {
    const { mediaText } = this.state;
    return mediaText.map((val, idx) => {
      return(
        <Form.Item label={`Media Description ${idx + 1}`} key={idx} >
          <Input.TextArea
            data-id={idx}
            value={ val }
            onChange={ this.handleMediaTextChange }
          >
          </Input.TextArea>
        </Form.Item>
      )
    });
  };

  /**
   * This function returns the footor of a main mondal component
   * @return {ReactComponent[]}     [List of ReactComponent buttons]
   */
  getFooterElements = () => {
    const { title, summary } = this.state;
    return [
      <Button
        key="clear"
        onClick={ this.handleModalClose }
        type="danger"
      >
        Clear
      </Button>,
      <Button key="back" onClick={ this.handleModalClose }>
        Close
      </Button>,
      <Button
        key="update"
        className="warning-button"
        htmlType="submit"
        onClick={this.handleSubmit}
        disabled= {this.isSubmitDisabled(title, summary)}
      >
        Update
      </Button>,
    ];
  };

  render() {
    const { isVisible, blog } = this.props;
    const { title, summary } = this.state;

    return (
      <div>
        <Modal
          width="50rem"
          visible={ isVisible }
          title={ blog.title }
          onOk={ this.handleSubmit }
          onCancel={ this.handleModalClose }
          footer={ this.getFooterElements() }
        >
          <Form onSubmit={this.handleSubmit} className="bp-form-container">
            { this.renderTitleForm(title)}
            { this.renderBlogSummaryForm(summary)}
            { this.renderTagForm() }
            { this.renderMediaContentForm() }
            { this.renderInputTextBoxes() }
          </Form>
        </Modal>
      </div>
    );
  }
}

export default BlogUpdateFormModal;