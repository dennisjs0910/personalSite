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
      <Tag key={idx} className="blog-tag">
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
        <div className="blog-summary-container">
          <h3>Summary:</h3>
          <p>{`${blog.summary}`}</p>
        </div>
        { this.renderContents(blog) }
        <div className="blog-categories">
          <h4 className="blog-category-label">Tags:</h4>
          { this.renderCategoryElements(blog) }
        </div>
      </Modal>
    );
  };
}

export default BlogModal;