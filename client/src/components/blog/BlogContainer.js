import React, { Component } from 'react';
import { Layout, Row, Col, Button, Card, Pagination } from 'antd';
import { BlogAction } from 'actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BlogFormModal } from 'components/modal';
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
  }

  componentDidMount() {
    this.props.getBlogs();
  }

  handlePaginationChange(value) {
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

  handleFormModalVisibility() {
    this.setState({ isModalFormVisible: !this.state.isModalFormVisible });
  }

  _shortenImageDescription(text) {
    const end = Math.min(text.length, 147);
    return text.substring(0, end) + "...";
  }

  _renderCreateBlogPostButton() {
    return(
      <Button type="primary" onClick={ this.handleFormModalVisibility }>CREATE +</Button>
    )
  }

  //TODO: implement feature in the future
  _renderFeaturedBlogs() {
    return null;
  }

  renderHeaderRow() {
    const paragraph = "Search through exisiting projects people have accomplished. Also you have the ability showcase your skillsets to people who are intereseted. Just click on the 'CREATE +' Button."

    return(<Row>
      <Col span={24}>
        <div id='blogHeaderContainer' className="main-img">
          <h1 className="title-header">Blog Currently Under Construction</h1>
          <p className="p-header">{ `${paragraph}` }</p>
          { this._renderCreateBlogPostButton() }
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
        const blogItem = blog["BlogPost"];
        const content = blog["BlogContent"];
        return (
          <Col span={6} key={blogItem.id}>
            <Card className="blog-card"
              title={blogItem.title}
              extra={<a href="/#">More</a>}
            >
              <img className="blog-img"
                src={content.image_url}
                alt=""
              />
              <p>{this._shortenImageDescription(content.image_text)}</p>
            </Card>
          </Col>
        );
      });
    }
    return null;
  }

  render() {
    const { isModalFormVisible } = this.state;
    const { blogs } = this.props || [];
    return (
      <Content >
        { this.renderHeaderRow() }
        { /**this._renderFeaturedBlogs() */}
        { this.renderAllBlogs(blogs) }
        <BlogFormModal
          isVisible={ isModalFormVisible }
          handleClose={ this.handleFormModalVisibility }
        />
      </Content>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getBlogs: BlogAction.getBlogs }, dispatch);
}

const mapStateToProps = state => {
  if (state && state.blog && state.blog.items) {
    return { blogs: state.blog.items };
  }
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogContainer);