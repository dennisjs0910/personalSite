import React, { Component } from 'react';
import { Button, Modal, Container, Image } from 'semantic-ui-react'
import { BlogAction } from '../../actions';
import { CommentContainer } from '../comment';
import { BlogMediaContents, BlogSummary } from '../blog';
import ModalFooter from './ModalFooter';

// TODO: <Tag>
class BlogModal extends Component {
  /**
   * Deletes blog.
   */
  handleDeleteOnClick = () => {
    const { handleDeleteBlog, handleClose, blog } = this.props;
    handleDeleteBlog(blog);
    handleClose();
  };

  /**
   * Update Blog.
   */
  handleUpdateOnClick = () => {
    const { handleUpdateBlog, blog } = this.props;
    handleUpdateBlog(blog);
  };

  render() {
    const { isVisible, blog, handleClose, handleUpdateBlog, currentUser } = this.props;
    if (!isVisible) return null;
    return (
      <Modal open={ isVisible }>
        <Modal.Header content={ blog.title } />
        <Modal.Content>
          <BlogSummary blog={ blog } />
          <BlogMediaContents contents={ blog.contents || [] } />
          <CommentContainer
            blogId={ blog.id }
            parentId={ blog.id }
            currentUser={ currentUser }
          />
        </Modal.Content>
        <ModalFooter
          blog={ blog }
          handleClose={ handleClose }
          handleDelete={ this.handleDeleteOnClick.bind(this) }
          handleUpdateOnClick={ this.handleUpdateOnClick.bind(this) }
          currentUser={ currentUser }
        />
      </Modal>
    );
  };
}

export default BlogModal;