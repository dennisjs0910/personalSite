import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import { BlogForm } from 'components/customForm';
import './BlogFormContainer.css';

const { Content } = Layout;
const paragraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

class BlogFormContainer extends Component {

  render() {
    return (
      <Content >
        <Row>
          <Col span={24}>
            <h1>BLOG POST FORM Currently Under Construction</h1>
            <p>{ `${paragraph} ${paragraph}` }</p>
          </Col>
        </Row>
        <BlogForm />
      </Content>
    );
  }
}

export default BlogFormContainer