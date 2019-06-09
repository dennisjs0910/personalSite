import React, { Component } from 'react';
import { Modal, Button, Form, Input, Tag, Icon, Upload  } from 'antd';
import { BlogAction } from '../../actions';

class BlogFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      tags: [],
      inputVisible: false,
      tagInputValue: '',
      fileList: [],
      mediaText: [""]
    };

    this.renderTitleForm = this.renderTitleForm.bind(this);
    this.renderTagForm = this.renderTagForm.bind(this);
    this.renderMediaContentForm = this.renderMediaContentForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputConfirm = this.handleInputConfirm.bind(this);
    this.uploadImageToCloudinary = this.uploadImageToCloudinary.bind(this);
  }

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
      onSuccess(imageRes.data, file);
    } catch(err) {
      onError(err);
    }
  }

  saveInputRef = input => (this.input = input);

  /**
   * This function is used to add tags, once user clicks on
   * "+ New Tag" it will set input to be visible.
   */
  showTagInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  /**
   * This function adds a new tag to the list of tags.
   * Also we reset the inputValue and unfocus the input.
   */
  handleInputConfirm = () => {
    const { tagInputValue, tags } = this.state;
    this.setState({
      tags: [...tags, tagInputValue],
      inputVisible: false,
      tagInputValue: '',
    });
  };

   /**
   * Handle close is used to remove a tag user have added
   * @param  {String} removedTag [Tag name to be deleted]
   */
  handleTagClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
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

  handleSubmit = e => {
    e.preventDefault();
    const { title, tags, fileList, mediaText } = this.state;
    const { currentUser, handleClose, createBlog } = this.props;
    handleClose();
    createBlog(Object.assign({
      title, tags, fileList, mediaText, user_id: currentUser.id
    }));
  };

  handleMediaChange = ({ fileList }) => this.setState({ fileList });
  //========== combine later on =================
  /**
   * This function sets the input value to what the user is typing.
   * @param  {Event Object} e
   */
  handleInputChange = ({ target }) => {
    this.setState({ tagInputValue: target.value });
  };

  handleTitleChange = ({ target }) => {
    this.setState({ title: target.value });
  };
  //=============================================


  addTextBox = e => {
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
          { tags.map(tag => <Tag key={tag}>{tag}</Tag>) }
        </div>
      </Form.Item>
    );
  };

  renderTagInput(inputVisible, tagInputValue) {
    if (inputVisible) {
      return(<Input
        ref={ this.saveInputRef }
        type="text"
        size="small"
        value={ tagInputValue }
        onChange={ this.handleInputChange }
        onBlur={ this.handleInputConfirm }
        onPressEnter={ this.handleInputConfirm }
      />);
    } else {
      return(
        <Tag
          className="bp-form-add-new-tag"
          onClick={ this.showTagInput } >
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
        >
          <Button>
            <Icon type="upload" /> Upload
          </Button>
        </Upload>
      </Form.Item>
    )
  };

  renderTitleForm() {
    return(
      <Form.Item label="Blog Title">
        <Input onChange={ this.handleTitleChange.bind(this) }>
        </Input>
      </Form.Item>
    );
  };

  renderInputTextBoxes() {
    const { mediaText } = this.state;
    return mediaText.map((val, idx) => {
      return(
        <Form.Item label={`Media Description ${idx + 1}`} key={idx} >
          <Input.TextArea
            data-id={idx}
            defaultValue={ val }
            onChange={ this.handleMediaTextChange }
          >
          </Input.TextArea>
        </Form.Item>
      )
    });
  };

  renderAddMoreTextButton() {
    return(
      <Button type="primary" onClick={ this.addTextBox } >
        Add More Content
      </Button>
    );
  };

  /**
   * TODO:
   * This function returns the footor of a main mondal component
   * @param  {Function} handleClose [function that closes modal]
   * @return {ReactComponent[]}     [List of ReactComponent buttons]
   */
  getFooterElements = (handleClose) => {
    return [
      <Button key="back" onClick={ handleClose }>
        Close
      </Button>,
      <Button key="submit" type="primary" htmlType="submit" onClick={this.handleSubmit}>
        Submit
      </Button>,
    ];
  }

  render() {
    const { isVisible, handleClose } = this.props;

    return (
      <div>
        <Modal
          visible={ isVisible }
          title="Blog Creation Form"
          onOk={ this.handleSubmit }
          onCancel={ handleClose }
          footer={ this.getFooterElements(handleClose) }
        >
          <Form onSubmit={this.handleSubmit} className="bp-form-container">
            { this.renderTitleForm()}
            { this.renderTagForm() }
            { this.renderMediaContentForm() }
            { this.renderInputTextBoxes() }
            { this.renderAddMoreTextButton() }
          </Form>
        </Modal>
      </div>
    );
  }
}

export default BlogFormModal