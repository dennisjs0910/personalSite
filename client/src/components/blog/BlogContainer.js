import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { isEmpty } from 'lodash';

import BlogSearch from './BlogSearch';
// TODO

// import BlogList from './BlogList';
// import Header from './Header';
// import { BlogFormModal, BlogModal } from '../modal';
// END TODO

import { BlogAction } from '../../actions';

// Styling imports
// import { Alert, Layout, Button } from 'antd';
// import "./BlogContainer.css";

import { Grid, Image } from 'semantic-ui-react'

class BlogContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormVisible: false,
      isReadVisible: false,
      isUpdate: false,
      selectedBlog: null,
    };

    this.handleCreateModal = this.handleCreateModal.bind(this);
    this.handleReadModal = this.handleReadModal.bind(this);
    this.handleUpdateModal = this.handleUpdateModal.bind(this);
    // this.renderCreateBlogPostButton = this.renderCreateBlogPostButton.bind(this);
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
      isUpdate: false,
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
      isUpdate: false,
      selectedBlog: blog,
    });
  };

  handleUpdateModal = (blog) => {
    this.setState({
      isReadVisible: false,
      isFormVisible: !this.state.isFormVisible,
      isUpdate: !this.state.isUpdate,
      selectedBlog: blog,
    });
  };

  generateFormProps = () => {
    const { isFormVisible, isUpdate, selectedBlog } = this.state;
    const { currentUser, createBlog, updateBlog } = this.props;
    let formProps = {
      currentUser,
      isUpdate,
      isVisible: isFormVisible,
      blog: selectedBlog,
      handleClose: this.handleCreateModal,
      handleSubmit: createBlog,
    };
    if (isUpdate) {
      formProps.handleClose = this.handleUpdateModal;
      formProps.handleSubmit = updateBlog;
    }
    return formProps;
  };

  // renderCreateBlogPostButton() {
  //   const { currentUser } = this.props;
  //   if (!!currentUser) {
  //     return(
  //       <Button type="primary" onClick={ this.handleCreateModal }>CREATE +</Button>
  //     )
  //   } else {
  //     return null;
  //   }
  // }

  // render() {
  //   const { isFormVisible, isReadVisible, selectedBlog } = this.state;
  //   const { blogs, currentUser, deleteBlog, error } = this.props;
  //   const formProps = this.generateFormProps();
  //   return (
  //     <Content className="fullscreen blog-container main-img">
  //       <Header
  //         currentUser={ currentUser }
  //         handleCreateModal={ this.handleCreateModal }
  //       />
  //       { !isEmpty(error) ?
  //         <Alert
  //           className="blog-alert"
  //           message="Error"
  //           description={ error.message }
  //           type="error"
  //           showIcon
  //           closable
  //         /> : null
  //       }
  //       <BlogSearch data={ blogs } handleReadModal={ this.handleReadModal } />
  //       <BlogList blogs={ blogs } handleReadModal={ this.handleReadModal }/>
  //       { isFormVisible ?
  //         <BlogFormModal {...formProps} />
  //         : null
  //       }
  //       {
  //         isReadVisible && selectedBlog !== null ?
  //         <BlogModal
  //           isVisible={ isReadVisible }
  //           handleClose={ this.handleReadModal }
  //           currentUser={ currentUser }
  //           blog={ selectedBlog }
  //           deleteBlog={ deleteBlog }
  //           handleUpdateModal={ this.handleUpdateModal }
  //         /> :
  //         null
  //       }
  //     </Content>
  //   );
  // }
  render() {
    const { isFormVisible, isReadVisible, selectedBlog } = this.state;
    const { blogs, currentUser, deleteBlog, error } = this.props;
    const formProps = this.generateFormProps();

    return(
      <Grid celled='internally'>
        <Grid.Row>
          <Grid.Column width={2}>
            Empty Stub
          </Grid.Column>

          <Grid.Column width={12}>
            <BlogSearch data={ blogs } handleReadModal={ this.handleReadModal } />
          </Grid.Column>

          <Grid.Column width={2}>
            Empty Stub
          </Grid.Column>
        </Grid.Row>
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