import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { BlogForm } from 'components/customForm';
// import './BlogFormContainer.css';

class BlogFormContainer extends Component {
  handleSubmit = () => {
    console.log("blogFormModal handle ok fn says hello world");
  };

  getFooterElements = (handleClose) => {
    return [
      <Button key="back" onClick={ handleClose }>
        Close
      </Button>,
      <Button key="submit" type="primary" onClick={this.handleSubmit}>
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
          <BlogForm />
        </Modal>
      </div>
    );
  }
}

export default BlogFormContainer