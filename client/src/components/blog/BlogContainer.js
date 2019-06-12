import React, { Component } from 'react';
import { Layout, Row, Col, Button, Card, Pagination } from 'antd';
import { BlogAction } from '../../actions';
import { BlogFormModal, BlogModal } from '../modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import "./BlogContainer.css";

const PER_PAGINATION = 4;
const { Content } = Layout;

class BlogContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormVisible: false,
      isReadVisible: false,
      isUpdate: false,
      selectedBlog: null,
      pageMin: 0,
      pageMax: PER_PAGINATION,
    };

    this.handlePaginationChange = this.handlePaginationChange.bind(this);
    this.handleCreateModal = this.handleCreateModal.bind(this);
    this.handleReadModal = this.handleReadModal.bind(this);
    this.handleUpdateModal = this.handleUpdateModal.bind(this);
    this.renderHeaderRow = this.renderHeaderRow.bind(this);
    this.renderCreateBlogPostButton = this.renderCreateBlogPostButton.bind(this);
  };

  componentDidMount() {
    this.props.getBlogs();
  };

  /**
   * Shortens image_text of blog that is to be displayed.
   * @param  {String} text
   * @return {String}    first 197 chars of image_text appended with ...;
   */
  _shortenImageDescription = (text) => {
    if (text && text.length <= 250) return text;
    const end = Math.min(text.length, 247);
    return text.substring(0, end) + "...";
  };

  /**
   * When user clicks on < or > it will recalculate indexes that are to be shown.
   * @param  {int} value [page number]
   */
  handlePaginationChange = value => {
    if (value <= 1) {
      this.setState({
        pageMin: 0,
        pageMax: PER_PAGINATION
      });
    } else {
      this.setState({
        pageMin: Math.max(1, value - 1) * PER_PAGINATION,
        pageMax: Math.min(Math.max(1, value) * PER_PAGINATION, this.props.blogs.length)
      });
    }
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

  renderCreateBlogPostButton() {
    const { currentUser } = this.props;
    if (!!currentUser) {
      return(
        <Button type="primary" onClick={ this.handleCreateModal }>CREATE +</Button>
      )
    } else {
      return null;
    }
  }

  renderHeaderRow() {
    const paragraph = "Search through exisiting projects people have accomplished. Also you have the ability showcase your skillsets to people who are intereseted. Just click on the 'CREATE +' Button."

    return(<Row>
      <Col span={24}>
        <div id='blogHeaderContainer' className="main-img">
          <h1 className="title-header">Blog Currently Under Construction</h1>
          <p className="p-header">{ `${paragraph}` }</p>
          { this.renderCreateBlogPostButton() }
        </div>
      </Col>
    </Row>);
  }

  //TODO: this can be of a component on its own.
  //REFACTOR TOGETHER START==============================================
  renderAllBlogs(blogs) {
    return(
      <Content>
        <div className="wrapper-content-margin">
          <h2>View All Blogs</h2>
          <Row gutter={16}>
            { this._renderBlogsToCard(blogs) }
          </Row>

          <div className="pagination-container">
            <Pagination
              defaultCurrent={1}
              defaultPageSize={4}
              onChange={ this.handlePaginationChange }
              total={ blogs.length }
            />
          </div>
        </div>
      </Content>
    );
  }

  _renderBlogsToCard(blogs) {
    if (blogs && blogs.length > 0) {
      return blogs.slice(this.state.pageMin, this.state.pageMax).map(blog => {
        return (
          <Col span={6} key={blog.id}>
            <Card className="blog-card"
              title={blog.title}
              extra={
                <Button onClick={ () => this.handleReadModal(blog) } >
                  More
                </Button>
              }
            >
              <p>{this._shortenImageDescription(blog.summary)}</p>
            </Card>
          </Col>
        );
      });
    }
    return null;
  }
  //REFACTOR TOGETHER END================================================

  render() {
    const { isFormVisible, isReadVisible, selectedBlog } = this.state;
    const { blogs, currentUser, deleteBlog } = this.props;
    const formProps = this.generateFormProps();

    return (
      <Content >
        { this.renderHeaderRow() }
        { this.renderAllBlogs(blogs) }
        { isFormVisible ?
          <BlogFormModal {...formProps} />
          : null
        }
        {
          isReadVisible && selectedBlog !== null ?
          <BlogModal
            isVisible={ isReadVisible }
            handleClose={ this.handleReadModal }
            currentUser={ currentUser }
            blog={ selectedBlog }
            deleteBlog={ deleteBlog }
            handleUpdateModal={ this.handleUpdateModal }
          /> :
          null
        }
      </Content>
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
  const { items } = state.blog;
  const { currentUser } = state.auth;
  return { blogs: items, currentUser };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogContainer);