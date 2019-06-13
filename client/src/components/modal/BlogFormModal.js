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
  filesToDelete: [],
  isPreviewVisible: false,
  previewImage: ""
};

class BlogFormModal extends Component {
  constructor(props) {
    super(props);

    const { blog, isVisible, isUpdate } = props;
    this.ogImageSet = new Set();

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
      this.tagSet = new Set();
      this.state = INITIAL_STATE;
    }

    this.renderTagContainer = this.renderTagContainer.bind(this);
    this.renderMediaContentForm = this.renderMediaContentForm.bind(this);
  }

  _getFilesAndText = ({contents=[]}) => {
    let res = { files: [], texts: []};
    contents.forEach((content, idx) => {
      this.ogImageSet.add(content.public_id);
      res.files.push({
        uid: `${idx}`,
        name: `${idx}_image`,
        status: 'done',
        response: [{ public_id: content.public_id, secure_url: content.media_url }]
      });
      res.texts.push(content.summary);
    });

    return res;
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

  /**
   * Handle close is used to remove a tag user have added
   * @param  {String} removedTag [Tag name to be deleted]
   */
  handleTagClose = removedTag => {
    const tags = this.state.tags.filter(tag =>  tag !== removedTag );
    this.tagSet.delete(removedTag);
    this.setState({ tags });
  };

  /**
   * Custom Request to upload an image to Cloudinary.
   * It is used to obtain a secure url to pass to the server in the future.
   * When it is successful
   * @param  { File } file
   * @param  { callback fn } onSuccess
   * @param  { callback fn } onError (currently removed)
   */
  handleMediaUpload = async ({ file, onSuccess, onError }) => {
    try {
      let data = new FormData();
      data.append('file', file);
      const imageRes = await BlogAction.postImage(data);
      this.addTextBox();
      // this.imageSet.add(imageRes.data.response[0].public_id);
      onSuccess(imageRes.data, file);
    } catch(err) {
      onError(err);
    }
  };

  /**
   * This function removes file from fileList as well as mediaText located in the same index
   * @param  {Object} file [file to be removed]
   */
  handleMediaRemove = (file) => {
    const { fileList, mediaText } = this.state;
    let idx = -1;
    let filesToDelete = [];

    let modifiedFileList = fileList.filter((f, i) => {
      if (isEqual(file, f)) {
        // this.imageSet.delete(file.response[0].public_id);
        filesToDelete.push(file.response[0].public_id);
        idx = i;
        return false;
      }
      return true;
    });

    let modifiedTexts = mediaText.filter((text, i) => i !== idx);
    this.setState({
      fileList: modifiedFileList,
      mediaText: modifiedTexts,
      filesToDelete: [...this.state.filesToDelete, ...filesToDelete]
    });
  };

  handlePreviewCancel = () => this.setState({ isPreviewVisible: false });

  handlePreview = file => {
    const url = (file.response && file.response.length === 1 && file.response[0].secure_url) || "";
    this.setState({
      previewImage: url,
      isPreviewVisible: true,
    });
  };

  handleMediaChange = ({ fileList }) => this.setState({ fileList });

  handleFormSubmit = e => {
    e.preventDefault();
    const { title, summary, tags, fileList, mediaText } = this.state;
    const { currentUser, handleSubmit, blog } = this.props;

    handleSubmit(Object.assign({
      title, summary, tags, fileList, mediaText, user_id: currentUser.id, blog
    }));

    this.handleModalClose(e, true);
  };

  handleModalClose = (e, isSubmitted) => {
    e.preventDefault();
    this.deleteUnusedImages(isSubmitted);

    // this.state.filesToDelete.forEach(id => BlogAction.deleteImage(id));
    delete this.input;
    delete this.tagSet;
    delete this.ogImageSet;
    this.props.handleClose(null);
  };

  deleteUnusedImages = (isSubmitted) => {
    const { isUpdate } = this.props;
    if (isUpdate && !isSubmitted) {
      let idList = [];
      this.state.filesToDelete.forEach(id => {
        if (!this.ogImageSet.has(id)) {
          idList.push(id);
        }
      });
      idList.forEach(id => BlogAction.deleteImage(id));
      return;
    };

    this.state.filesToDelete.forEach(id => BlogAction.deleteImage(id));
    if (!isSubmitted) {
      this.state.fileList.forEach(file => {
        BlogAction.deleteImage(file.response[0].public_id);
      });
    }
  };

  handleStateReset = (e) => {
    e.preventDefault();
    this.setState(INITIAL_STATE);
  };

  /**
   * This function sets the input value to what the user is typing.
   * @param  {Event Object} e
   */
  handleTextInputChange = ({target}, key) => {
    this.setState({ [key]: target.value });
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

  addTextBox = () => {
    const { mediaText } = this.state;
    this.setState({
      mediaText: [...mediaText, ""]
    });
  };

  /**
   * Returns true if title of summary is an empty string
   */
  isSubmitDisabled = (title, summary) => {
    return title === "" || summary === "";
  };

  renderTagContainer() {
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
          customRequest={ this.handleMediaUpload }
          onChange={ this.handleMediaChange }
          onPreview={ this.handlePreview }
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
        required
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
        required
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
        <Form.Item label={`Media Summary ${idx + 1}`} key={idx} >
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
    const buttonText = isUpdate ? "Update" : "Submit";
    return [
      <Button
        key="clear"
        onClick={ this.handleStateReset }
        type="danger"
      >
        Clear
      </Button>,
      <Button key="close" onClick={(e) => this.handleModalClose(e, false) }>
        Close
      </Button>,
      <Button
        key="submit"
        className={ buttonClassName }
        htmlType="submit"
        onClick={ this.handleFormSubmit }
        disabled= {this.isSubmitDisabled(title, summary)}
      >
        { buttonText }
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
          onCancel={ (e) => this.handleModalClose(e, false) }
          footer={ this.getFooterElements() }
        >
          <Form onSubmit={this.handleFormSubmit} className="bp-form-container" labelAlign='left'>
            { this.renderTitleForm(title)}
            { this.renderBlogSummaryForm(summary)}
            { this.renderTagContainer() }
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