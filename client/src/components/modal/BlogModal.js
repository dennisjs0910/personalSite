import React, { Component } from 'react';
import { Modal, Button, Tag, Popconfirm } from 'antd';
import { BlogAction } from '../../actions';
import "./BlogModal.css";

const ADMIN = "admin";

class BlogModal extends Component {

  handleDeleteOnClick = () => {
    const { deleteBlog, handleClose, blog} = this.props;
    blog.contents.forEach(content => BlogAction.deleteImage({
      public_id: content.public_id,
      resource_type: content.is_video ? 'video' : 'image'
    }));
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
  getFooterElements = (currentUser={}, {user_id}, handleClose) => {
    let footer = [];
    if (!!currentUser && (currentUser.id === user_id  || currentUser.permission === ADMIN)) {
      footer.push(
        (<Popconfirm
          key="popup"
          title="Are you sure you want to delete this blog?"
          onConfirm={ this.handleDeleteOnClick }
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="danger"
            key="delete">
            Delete
          </Button>
        </Popconfirm>),
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
    return contents.map(content => {
      console.log(content.summary.split('\n'));
      return(
        <div className="blog-content-container" key={content.id}>
          {
            content.is_video ?
            <video className="blog-content-media" controls>
              <source src={content.media_url} type="video/mp4"/>
            </video> :
            <img className="blog-content-media" src={content.media_url} alt="" />
          }
          <div className="blog-content-summary-container">{
            content.summary.split('\n').map(paragraph => (
              <p className="blog-content-summary" >{paragraph}</p>
            ))
          }</div>
        </div>
      );
    });
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
        footer={ this.getFooterElements(currentUser, blog, handleClose) }
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