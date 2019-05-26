import React, { Component } from 'react';
import { Form, Input, Button, Tag, Icon, Upload } from 'antd';
import { BlogAction } from 'actions';

class BpForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      inputVisible: false,
      inputValue: '',
      image_url: ''
    };

    this.renderTagForm = this.renderTagForm.bind(this);
    this.renderMediaContentForm = this.renderMediaContentForm.bind(this);
  }

  /**
   * This function is used to add tags, once user clicks on
   * "+ New Tag" it will set input to be visible.
   */
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  /**
   * Handle close is used to remove a tag user have added
   * @param  {String} removedTag [Tag name to be deleted]
   */
  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
  };

  /**
   * This function sets the input value to what the user is typing.
   * @param  {Event Object} e
   */
  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  saveInputRef = input => (this.input = input);

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }

    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  // TODO: will need to refactor in the future
  handleSubmit = e => {
    const { tags } = this.state;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log('Received tags: ', tags);
      } else {
        console.log(err);
      }
    });
  };

  /**
   * Custom Request to upload an image to Cloudinary.
   * It is used to obtain a secure url to pass to the server in the future.
   * When it is successful
   * @param  { File } file
   * @param  { callback fn } onSuccess
   * @param  { callback fn } onError
   */
  uploadCustomRequest = async ({ file, onSuccess, onError }) => {
    let data = new FormData();
    data.append('file', file);

    const res = await BlogAction.postImage(data);
    if (res && res.data && res.data[0] && res.data[0].secure_url) {
      this.setState({
        image_url: res.data[0].secure_url
      });
      onSuccess(res.data, file);
    } else {
      //TODO: params for onError may not be correct, please check and revise in the future
      // onError(file);
    }
  }

  renderTagForm() {
    const { tags, inputVisible, inputValue } = this.state;
    return(
      <Form.Item label="Tags">
        { this._renderTagFormHelper(inputVisible, inputValue) }
        <div>
          { tags.map(tag => <Tag key={tag}>{tag}</Tag>) }
        </div>
      </Form.Item>
    );
  }

  _renderTagFormHelper(inputVisible, inputValue) {
    if (inputVisible) {
      return(<Input
        ref={this.saveInputRef}
        type="text"
        size="small"
        style={{ width: 78 }}
        value={inputValue}
        onChange={this.handleInputChange}
        onBlur={this.handleInputConfirm}
        onPressEnter={this.handleInputConfirm}
      />);
    } else {
      return(<Tag
        className="bp-form-add-new-tag"
        onClick={this.showInput} >
        <Icon type="plus" /> New Tag
      </Tag>);
    }
  }

  renderMediaContentForm() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <Form.Item label="Media">
          <h6>Only able to support one video and one image</h6>
          <Upload className='upload-list-inline'
            customRequest={ this.uploadCustomRequest }
          >
            <Button>
              <Icon type="upload" /> Upload
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Image Description">
          { getFieldDecorator(`img-descprition`, {})(<Input.TextArea />) }
        </Form.Item>

        <Form.Item label="Video Description">
          { getFieldDecorator(`video-descprition`, {})(<Input.TextArea />) }
        </Form.Item>
      </div>
    )
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className="bp-form-container">
        <Form.Item label="Blog Title">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input the title for this blog', }],
          })(<Input />)}
        </Form.Item>

        { this.renderTagForm() }
        { this.renderMediaContentForm() }

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Post Blog Content
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const BlogForm = Form.create()(BpForm)
export default BlogForm;