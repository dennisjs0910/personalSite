import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BlogAction } from '../../actions';
import { isEmpty } from 'lodash';
import { BlogSearch } from '../search';
import { BlogFormModal, BlogUpdateFormModal, BlogModal } from '../modal';
import BlogList from './BlogList';
import { CreateBlogButton } from '../button';

import { Grid, Message } from 'semantic-ui-react'

const VIEW_OPTION_MAP = {
  search: {
    computer:  13,
    mobile: 14,
    tablet: 13,
    widescreen: 13,
  },
  button: {
    computer: 3,
    mobile: 4,
    tablet: 3,
    widescreen: 3
  }
};

class BlogContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormVisible: false,
      isReadVisible: false,
      isUpdateVisible: false,
      selectedBlog: null,
    };
  };

  componentDidMount() {
    this.props.getBlogs();
  };

  /**
   * This is used to open and close blog Create Form.
   */
  handleCreateModal = () => {
    this.setState({
      isReadVisible: false,
      isFormVisible: !this.state.isFormVisible,
      isUpdateVisible: false,
      selectedBlog: null,
    });
  };

  /**
   * This is used to open and close Blog Modal, when it is used to open blog will not be null,
   * and onClose blog param will be passed a null value
   * @param  {Object} blog [blogObject]
   */
  handleReadModal = (blog) => {
    this.setState({
      isReadVisible: !this.state.isReadVisible,
      isFormVisible: false,
      isUpdateVisible: false,
      selectedBlog: blog,
    });
  };

  handleUpdateModal = (blog) => {
    this.setState({
      isReadVisible: false,
      isFormVisible: false,
      isUpdateVisible: !this.state.isUpdateVisible,
      selectedBlog: blog,
    });
  };

  /**
   * Deletes blog from storage and database if blog arg exists
   * @param  {Blog Object} blog
   */
  handleDeleteBlog = (blog) => {
    if (!!blog) {
      this.props.deleteBlog(blog);
    }
  };

  /**
   * When user clicks on close message it dispatches action to redux
   */
  handleMessageDismiss = () => {
    this.props.clearError();
  };

  /**
   * Genereates Blog Read properties
   * @return {Properties Object} [React props object]
   */
  getBlogReadProps = () => {
    const { isFormVisible, selectedBlog } = this.state;
    const { currentUser, createBlog } = this.props;
    return {
      currentUser,
      isVisible: isFormVisible,
      blog: selectedBlog,
      handleClose: this.handleCreateModal.bind(this),
      handleSubmit: createBlog,
    };
  };

  /**
   * Genereates Blog Update properties
   * @return {Properties Object} [React props object]
   */
  getBlogUpdateProps = () => {
    const { isUpdateVisible, selectedBlog } = this.state;
    const { currentUser, updateBlog } = this.props;
    return {
      currentUser,
      isVisible: isUpdateVisible,
      blog: selectedBlog,
      handleClose: this.handleUpdateModal.bind(this),
      handleSubmit: updateBlog,
    };
  }

  //TODO: Error handling
  render() {
    const { isReadVisible, selectedBlog, isFormVisible, isUpdateVisible } = this.state;
    const { blogs, currentUser, error } = this.props;

    return(
      <Grid>
        { !isEmpty(error) &&
          <Message
            onDismiss={ this.handleMessageDismiss }
            icon='warning sign'
            warning
            header={ error.field || "Warning" }
            content={ error.message }
          />
        }
        { isFormVisible && <BlogFormModal { ...this.getBlogReadProps() } /> }
        { isUpdateVisible && <BlogUpdateFormModal { ...this.getBlogUpdateProps() } /> }
        <Grid.Row>
          <Grid.Column { ...VIEW_OPTION_MAP.search }>
            <BlogSearch
              data={ blogs }
              handleReadModal={ this.handleReadModal.bind(this) }
              handleSelect={ this.handleReadModal.bind(this) }
            />
          </Grid.Column>
          <Grid.Column className="blog-grid-create-button-container" { ...VIEW_OPTION_MAP.button }>
            <CreateBlogButton
              currentUser={ currentUser }
              handleCreateModal={ this.handleCreateModal.bind(this) }
            />
          </Grid.Column>
        </Grid.Row>

        <BlogList
          blogs={ blogs }
          handleReadModal={ this.handleReadModal.bind(this) }
        />

        <BlogModal
          isVisible={ isReadVisible }
          handleClose={ this.handleReadModal.bind(this) }
          handleUpdateBlog={ this.handleUpdateModal.bind(this) }
          handleDeleteBlog={ this.handleDeleteBlog.bind(this) }
          currentUser={ currentUser }
          blog={ selectedBlog }
          error={ error }
        />
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getBlogs: BlogAction.getBlogs,
      createBlog: BlogAction.createBlog,
      deleteBlog: BlogAction.deleteBlog,
      updateBlog: BlogAction.updateBlog,
      deleteImage: BlogAction.deleteImage,
      clearError: BlogAction.clearError,
    },
    dispatch
  );
}

const mapStateToProps = state => {
  const { items, error } = state.blog;
  const { currentUser } = state.auth;
  return { blogs: items, currentUser, error };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogContainer);