import React, { Component } from 'react';
import { Modal, Button, Tag} from 'antd';
import "./BlogModal.css";

class BlogModal extends Component {

  handleDeleteOnClick = () => {
    const { deleteBlog, handleClose, blog} = this.props;
    deleteBlog(blog);
    handleClose();
  };

  handleUpdateOnClick = () => {
    const { handleUpdateModal, blog } = this.props;
    handleUpdateModal(blog);
  };

  /**
   * This function returns the footor of a main mondal component.
   * If blog belongs to current_user, it will also show Update and Delete Buttons.
   * @param  {Function} handleClose [function that closes modal]
   * @return {ReactComponent[]}     [List of ReactComponent buttons]
   */
  getFooterElements = ({id}, {user_id}, handleClose) => {
    let footer = [];
    if (id === user_id && !!id) {
      footer.push(
        (<Button
          onClick={ this.handleDeleteOnClick }
          type="danger"
          key="delete">
          Delete
        </Button>),
        (<Button
          onClick={ this.handleUpdateOnClick }
          className="warning-button"
          key="update">
          Update
        </Button>)
      );
    }

    footer.push(
      (<Button key="back" onClick={ handleClose }>
        Close
      </Button>)
    );
    return footer;
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
    const { isVisible, handleClose, blog, currentUser } = this.props;
    if (!blog) return null;

    return(
      <Modal
        className="blog-modal-container"
        width="50rem"
        title={blog.title}
        visible={ isVisible }
        onCancel={() => handleClose(null) }
        footer={ this.getFooterElements(currentUser || {}, blog, handleClose) }
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