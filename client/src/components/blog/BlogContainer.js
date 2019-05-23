import React, { Component } from 'react';
import { Layout, Row, Col, Button, Card, Pagination } from 'antd';
import { mockData } from './fixtures';
import "./BlogContainer.css";

const PER_PAGINATION = 4;
const { Content } = Layout;
const paragraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

class BlogContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageMin: 0,
      pageMax: PER_PAGINATION
    }

    this.handlePaginationChange = this.handlePaginationChange.bind(this);
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
        pageMax: Math.min(Math.max(1, value) * PER_PAGINATION, mockData.length)
      });
    }
  }

  handleCreateButtonClick() {
    console.log("create button clicked ");
  }

  _renderFeaturedBlogs() {
    return(
      <div className="custom-wrapper">
        <h2>Featured Blog Posts</h2>
        <Row className="margin-row" gutter={16} >
          <Col span={6}>
            <div className="gutter-box">Blog 1</div>
          </Col>
          <Col span={6}>
            <div className="gutter-box">Blog 2</div>
          </Col>
          <Col span={6}>
            <div className="gutter-box">Blog 3</div>
          </Col>
          <Col span={6}>
            <div className="gutter-box">Blog 4</div>
          </Col>
        </Row>
      </div>
    );
  }

  _renderAllBlogs(data) {
    if (data && data.length > 0) {
      return data.slice(this.state.pageMin, this.state.pageMax).map(blog => {
        return (
          <Col span={6} key={blog.id}>
            <Card className="blog-card"
              title={blog.title}
              extra={<a href="/#">More</a>}
              style={{ width: 300 }}
            >
              <p>{blog.value}</p>
            </Card>
          </Col>
        );
      });
    }
    return null;
  }

  _renderCreateBlogPostButton() {
    return(
      <Button type="primary" onClick={ this.handleCreateButtonClick }>CREATE +</Button>
    )
  }

  render() {
    return (
      <Content >
        <Row>
          <Col span={21}>
            <h1>BLOG CONTAINER Currently Under Construction</h1>
            <p>{ `${paragraph} ${paragraph}` }</p>
          </Col>

          <Col span={3}>
            { this._renderCreateBlogPostButton() }
          </Col>
        </Row>

        { this._renderFeaturedBlogs() }

        <Row>
        { this._renderAllBlogs(mockData) }
        </Row>
        <div className="pagination-container">
          <Pagination
            defaultCurrent={1}
            defaultPageSize={4}
            onChange={ this.handlePaginationChange }
            total={ mockData.length }
          />
        </div>
      </Content>
    );
  }
}

export default BlogContainer