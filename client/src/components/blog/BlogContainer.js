import React, { Component } from 'react';
import { Layout, Row, Col, Button, Card, Pagination } from 'antd';
import { BlogAction } from '../../actions';
import { BlogFormModal } from '../modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import "./BlogContainer.css";

const PER_PAGINATION = 4;
const { Content } = Layout;

class BlogContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalFormVisible: false,
      pageMin: 0,
      pageMax: PER_PAGINATION
    }

    this.handlePaginationChange = this.handlePaginationChange.bind(this);
    this.handleFormModalVisibility = this.handleFormModalVisibility.bind(this);
    this.renderHeaderRow = this.renderHeaderRow.bind(this);
    this.renderCreateBlogPostButton = this.renderCreateBlogPostButton.bind(this);
  }

  componentDidMount() {
    this.props.getBlogs();
  }

  /**
   * Shortens image_text of blog that is to be displayed.
   * @param  {String} text
   * @return {String}    first 147 chars of image_text appended with ...;
   */
  _shortenImageDescription = (text) => {
    if (text && text.length <= 150) return text;
    const end = Math.min(text.length, 147);
    return text.substring(0, end) + "...";
  }

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
  }

  handleFormModalVisibility = () => {
    this.setState({ isModalFormVisible: !this.state.isModalFormVisible });
  }

  renderCreateBlogPostButton() {
    const { currentUser } = this.props;
    if (!!currentUser) {
      return(
        <Button type="primary" onClick={ this.handleFormModalVisibility }>CREATE +</Button>
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
              extra={<a href="/#">More</a>}
            >
              <img className="blog-img"
                src={blog.image_url || ""}
                alt=""
              />
              <p>{this._shortenImageDescription(blog.image_text || "")}</p>
            </Card>
          </Col>
        );
      });
    }
    return null;
  }

  render() {
    const { isModalFormVisible } = this.state;
    const { blogs, currentUser, createBlog } = this.props;
    return (
      <Content >
        { this.renderHeaderRow() }
        { this.renderAllBlogs(blogs) }
        <BlogFormModal
          isVisible={ isModalFormVisible }
          handleClose={ this.handleFormModalVisibility }
          createBlog={ createBlog }
          currentUser={ currentUser }
        />
      </Content>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getBlogs: BlogAction.getBlogs,
      createBlog: BlogAction.createBlog
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