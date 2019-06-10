import React, { Component } from 'react';
import { Modal, Button, Tag} from 'antd';
import "./BlogModal.css";

class BlogModal extends Component {
  /**
   * This function returns the footor of a main mondal component
   * @param  {Function} handleClose [function that closes modal]
   * @return {ReactComponent[]}     [List of ReactComponent buttons]
   */
  getFooterElements = (handleClose) => {
    return [
      <Button key="back" onClick={ handleClose }>
        Close
      </Button>,
    ];
  };

  renderCategoryElements = ({ category=[] }) => {
    return category.map((element, idx) => (
      <Tag key={idx} >
        {element}
      </Tag>
    ));
  };

  renderContents = ({ contents=[] }) => {
    return contents.map(content => (
      <div className="blog-content-container" key={content.id}>
        <img className="blog-content-img" src={content.media_url} alt="" />
        <p>{content.summary}</p>
      </div>
    ));
  };

  render() {
    const { isVisible, handleClose, blog } = this.props;
    return(
      <Modal
        className="blog-modal-container"
        width="50rem"
        title={blog.title}
        visible={ isVisible }
        onCancel={() => handleClose(null) }
        footer={ this.getFooterElements(handleClose) }
      >
        <div>{`${blog.summary}`}</div>
        <div>{ this.renderCategoryElements(blog) }</div>
        <div>{ this.renderContents(blog) }</div>
      </Modal>
    );
  };
}

export default BlogModal;