import React, { Component } from "react";
import { Layout, Row, Col } from 'antd';

const { Content } = Layout;
const paragraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

class BlogContainer extends Component {

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
            <div className="gutter-box">Blog 2</div>
          </Col>
          <Col span={6}>
            <div className="gutter-box">Blog 2</div>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    return (
      <Content >
        <Row>
          <Col span={24}>
            <h1>BLOG CONTAINER Currently Under Construction</h1>
            <p>{ `${paragraph} ${paragraph}` }</p>
          </Col>
        </Row>
        { this._renderFeaturedBlogs() }
        { this._renderFeaturedBlogs() }
      </Content>
    );
  }
}

export default BlogContainer