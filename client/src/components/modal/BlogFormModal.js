import React, { Component } from 'react';
import { Modal, Button, Form, Input, Tag, Icon, Upload  } from 'antd';
import { BlogAction } from '../../actions';
import { isEqual } from 'lodash';

const INITIAL_STATE = {
  title: "", //required
  summary: "", //required
  tags: [],
  inputVisible: false,
  tagInputValue: '',
  fileList: [],
  mediaText: [],
  isPreviewVisible: false,
  previewImage: ""
};

class BlogFormModal extends Component {
  constructor(props) {
    super(props);

    const { blog, isVisible, isUpdate } = props;
    if (!!blog && isVisible && isUpdate) {
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
        response: [{ secure_url: content.media_url }]
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

  /**
   * This function adds a new tag to the list of tags if tagInput is unique.
   * Also we reset the inputValue and unfocus the input.
   */
  handleTagConfirm = () => {
    const { tagInputValue, tags } = this.state;

    if (!this.tagSet.has(tagInputValue) && tagInputValue !== '') {
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

  handleStateReset = (e) => {
    e.preventDefault();
    this.setState(INITIAL_STATE);
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

    let modifiedTexts = mediaText.filter((text, i) => i !== idx);
    this.setState({
      fileList: modifiedFileList,
      mediaText: modifiedTexts
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { title, summary, tags, fileList, mediaText } = this.state;
    const { currentUser, handleSubmit, handleClose, blog } = this.props;

    handleSubmit(Object.assign({
      title, summary, tags, fileList, mediaText, user_id: currentUser.id, blog
    }));
    handleClose(null);
    this.handleStateReset(e);
  };

  handleModalClose = (e) => {
    e.preventDefault();
    const { handleClose } = this.props;
    this.setState(INITIAL_STATE);
    delete this.input;
    delete this.tagSet;
    handleClose(e);
  };

  handleMediaChange = ({ fileList }) => this.setState({ fileList });

  /**
   * This function sets the input value to what the user is typing.
   * @param  {Event Object} e
   */
  handleTextInputChange = ({target}, key) => {
    this.setState({ [key]: target.value });
  };

  handlePreviewCancel = () => this.setState({ isPreviewVisible: false });

  handlePreview = file => {
    const url = (file.response && file.response.length === 1 && file.response[0].secure_url) || "";
    this.setState({
      previewImage: url,
      isPreviewVisible: true,
    });
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
      <Form.Item label="Tags"
        labelCol={{span: 3}}
        wrapperCol={{span: 21}}
      >
        { this.renderTagInput(inputVisible, tagInputValue) }
        <div className="tag-wrapper-container">
          { tags.map(tag =>
            <Tag
              className="form-tag"
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
          className="form-tag-input"
          ref={ this.saveInputRef }
          type="text"
          value={ tagInputValue }
          onChange={(e) => this.handleTextInputChange(e, "tagInputValue") }
          onBlur={ this.handleTagConfirm }
          onPressEnter={ this.handleTagConfirm }
        />);
    } else {
      return(
        <Tag
          className="form-add-tag form-tag-input"
          onClick={ this.showTagInput }
          color="blue"
        >
          <Icon type="plus" /> New Tag
        </Tag>
      );
    }
  };

  renderMediaContentForm() {
    const { fileList } = this.state;
    return(
      <Form.Item label="Media"
        labelCol={{span: 3}}
        wrapperCol={{span: 21}}
      >
        <Upload
          className='upload-list-inline'
          listType="picture-card"
          customRequest={ this.uploadImageToCloudinary }
          onChange={ this.handleMediaChange }
          onPreview={this.handlePreview}
          fileList={ fileList }
          onRemove={ this.handleMediaRemove }
        >
          <h6>Only able to upload one image at a time.</h6>
          <Button>
            <Icon type="upload" /> Upload
          </Button>
        </Upload>
      </Form.Item>
    )
  };

  renderTitleForm(title) {
    return(
      <Form.Item label="Blog Title"
        labelCol={{span: 3}}
        wrapperCol={{span: 21}}
      >
        <Input value={title} onChange={(e) => this.handleTextInputChange(e, "title") }>
        </Input>
      </Form.Item>
    );
  };

  renderBlogSummaryForm(summary) {
    return(
      <Form.Item label="Summary"
        labelCol={{span: 3}}
        wrapperCol={{span: 21}}
      >
        <Input.TextArea
          value={summary}
          autosize={{ minRows: 6, maxRows: 20 }}
          onChange={(e) => this.handleTextInputChange(e, "summary") }
        >
        </Input.TextArea>
      </Form.Item>
    );
  }

  renderInputTextBoxes() {
    const { mediaText } = this.state;
    return mediaText.map((val, idx) => {
      return(
        <Form.Item label={`Summary ${idx + 1}`} key={idx} >
          <Input.TextArea
            autosize={{ minRows: 6, maxRows: 20 }}
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
    const { isUpdate } = this.props;
    const buttonClassName = isUpdate ? "warning-button" : "ant-btn-primary";

    return [
      <Button
        key="clear"
        onClick={ this.handleStateReset }
        type="danger"
      >
        Clear
      </Button>,
      <Button key="close" onClick={ this.handleModalClose }>
        Close
      </Button>,
      <Button
        key="submit"
        className={ buttonClassName }
        htmlType="submit"
        onClick={ this.handleFormSubmit }
        disabled= {this.isSubmitDisabled(title, summary)}
      >
        Submit
      </Button>,
    ];
  };

  render() {
    const { isVisible } = this.props;
    const { title, summary, isPreviewVisible, previewImage } = this.state;

    return (
      <div>
        <Modal
          width="66%"
          visible={ isVisible }
          title="Blog Creation Form"
          onOk={ this.handleFormSubmit }
          onCancel={ this.handleModalClose }
          footer={ this.getFooterElements() }
        >
          <Form onSubmit={this.handleFormSubmit} className="bp-form-container" labelAlign='left'>
            { this.renderTitleForm(title)}
            { this.renderBlogSummaryForm(summary)}
            { this.renderTagForm() }
            { this.renderMediaContentForm() }
            { this.renderInputTextBoxes() }
          </Form>
          <Modal visible={isPreviewVisible} footer={null} onCancel={this.handlePreviewCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </Modal>
      </div>
    );
  }
}

export default BlogFormModal;