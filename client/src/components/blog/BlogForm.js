import React, { Component } from 'react';
import { Form, Input, Button, Tag, Icon, Upload } from 'antd';
import { BlogAction } from '../../actions';

class BpForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      tags: [],
      inputVisible: false,
      tagInputValue: '',
      media_url: [],
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
  uploadImageToCloudinary = async ({ file, onSuccess }) => {
    let data = new FormData();
    data.append('file', file);
    try {
      const res = await BlogAction.postImage(data);
      if (res && res.data && res.data[0] && res.data[0].secure_url) {
        this.props.handleUploadedImage(res.data[0].secure_url);
        onSuccess(res.data, file);
      }
    } catch(err) {
      console.log(err);
    }
  }

  saveInputRef = input => (this.input = input);

  handleSubmit = e => {
    e.preventDefault();
    const { tags, image_url } = this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.createBlog(Object.assign(values, { tags, image_url }));
        // TODO: this.props.history is currently undefined fix the issue please
        // this.props.history.push("/blog");
      } else {
        console.log(err);
      }
    });
  };

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
    // this.props.handleTagInputConfirm(tagInputValue);

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
  }
  //=============================================


  addTextBox = e => {
    const { mediaText } = this.state;
    this.setState({
      mediaText: [...mediaText, ""]
    });
  }

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
  }

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
  }

  renderMediaContentForm(getFieldDecorator) {
    return(
      <div>
        <Form.Item label="Media">
          <h6>Only able to support one video and one image</h6>
          <Upload className='upload-list-inline'
            customRequest={ this.uploadImageToCloudinary }
          >
            <Button>
              <Icon type="upload" /> Upload
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Image Description">
          { getFieldDecorator(`img_text`, {})(<Input.TextArea />) }
        </Form.Item>
      </div>
    )
  }

  renderTitleForm() {
    return(
      <Form.Item label="Blog Title">
        <Input onChange={ this.handleTitleChange.bind(this) }>
        </Input>
      </Form.Item>
    );
  }

  renderInputTextBoxes() {
    const { mediaText } = this.state;
    return mediaText.map((val, idx) => {
      return(
        <Form.Item label={`Media Description ${idx + 1}`} key={idx}>
          <Input.TextArea defaultValue={ val }>
          </Input.TextArea>
        </Form.Item>
      )
    });
  }

  renderAddMoreTextButton() {
    return(
      <Button type="primary" onClick={ this.addTextBox } >
        Add More Content
      </Button>
    );
  }

  render() {
    const { getFieldDecorator } = this.props;
    console.log("BLOG FORM STATE: ", this.state);
    return (
      <div>
        { this.renderTitleForm()}
        { this.renderTagForm() }
        { this.renderInputTextBoxes() }
        { this.renderAddMoreTextButton() }
        { /**this.renderMediaContentForm(getFieldDecorator) */ }
      </div>
    );
  }
}

export default BpForm;