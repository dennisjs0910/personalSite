import React, { Component } from 'react';
import { Button, Modal, Confirm } from 'semantic-ui-react'
import { CommentContainer } from '../comment';
import { BlogMediaContents, BlogSummary } from '../blog';
import { TagsContainer } from '../tag';
import ModalFooter from './ModalFooter';

// TODO: <Tag>
class BlogModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleteConfimVisible: false,
    };
  }

  /**
   * When user confirms delete blog, it calls props.handleDelete as well as close confirm
   */
  handleDeleteConfirm = () => {
    const { handleDeleteBlog, handleClose, blog } = this.props;
    this.setState({ isDeleteConfimVisible: false });
    handleDeleteBlog(blog);
    handleClose();
  };

  /**
   * Opens and closes when user clicks on Delete Button or cancel Delete Button
   */
  handleDeleteConfirmVisibility = () => {
    this.setState({ isDeleteConfimVisible: !this.state.isDeleteConfimVisible });
  };

  /**
   * Update Blog.
   */
  handleUpdateButton = () => {
    const { handleUpdateBlog, blog } = this.props;
    handleUpdateBlog(blog);
  };

  render() {
    const { isDeleteConfimVisible } = this.state;
    const { isVisible, blog, handleClose, currentUser } = this.props;
    if (!isVisible) return null;
    return (
      <Modal open={ isVisible }>
        <Modal.Header content={ blog.title } />
        <Modal.Content>
          <BlogSummary blog={ blog } />
          <BlogMediaContents contents={ blog.contents || [] } />
          <TagsContainer category={ blog.category } size={ 'large' } />
          <CommentContainer
            blogId={ blog.id }
            parentId={ blog.id }
            currentUser={ currentUser }
          />
        </Modal.Content>
        <ModalFooter
          blog={ blog }
          handleClose={ handleClose }
          handleDelete={ this.handleDeleteConfirmVisibility.bind(this) }
          handleUpdateButton={ this.handleUpdateButton.bind(this) }
          currentUser={ currentUser }
        />
        <Confirm
          content='Are you sure? Blog will be deleted forever'
          open={ isDeleteConfimVisible }
          confirmButton={<Button negative content="Delete"/>}
          onCancel={ this.handleDeleteConfirmVisibility }
          onConfirm={ this.handleDeleteConfirm.bind(this) }
        />
      </Modal>
    );
  };
}

export default BlogModal;