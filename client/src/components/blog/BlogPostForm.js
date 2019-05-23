import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import { Link } from "react-router-dom";

const PER_PAGINATION = 4;
const { Content } = Layout;
const paragraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

class BlogPostForm extends Component {

  render() {
    return (
      <Content >
        <Row>
          <Col span={24}>
            <h1>BLOG POST FORM Currently Under Construction</h1>
            <p>{ `${paragraph} ${paragraph}` }</p>
          </Col>
        </Row>
      </Content>
    );
  }
}

export default BlogPostForm