import React, { Component } from 'react';
import { Modal, Button, Form } from 'antd';
import { BlogForm } from 'components/customForm';
// import './BlogFormContainer.css';

class BlogFormContainer extends Component {
  constructor(props) {
    super(props);
    // TODO: connect tags and image_url to BlogFormContainer and disconnect from BlogForm
    this.state = {
      tags: [],
      inputValue: '',
      image_url: ''
    }
    this.handleTagInputConfirm = this.handleTagInputConfirm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * This function adds a new tag to the list of tags.
   * Also we reset the inputValue and unfocus the input.
   */
  handleTagInputConfirm = (inputValue) => {
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }

    this.setState({
      tags,
      inputValue: '',
    });
  };

  handleUploadedImage = (image_url) => {
    this.setState({ image_url });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { tags, image_url } = this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleClose();
        this.props.createBlog(Object.assign(values, { tags, image_url }));
      } else {
        console.log(err);
      }
    });
  };

  /**
   * TODO:
   * This function returns the footor of a main mondal component
   * @param  {Function} handleClose [function that closes modal]
   * @return {ReactComponent[]}             [List of ReactComponent buttons]
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
    const { getFieldDecorator } = this.props.form;
    const { tags } = this.state;
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
            <BlogForm
              getFieldDecorator={ getFieldDecorator }
              handleTagInputConfirm={ this.handleTagInputConfirm }
              handleUploadedImage={ this.handleUploadedImage }
              tags={ tags }
            />
          </Form>
        </Modal>
      </div>
    );
  }
}

const BlogFormModal = Form.create()(BlogFormContainer);
export default BlogFormModal