import React, { Component } from "react";
import { Layout, Row, Col } from 'antd';
import './HomePage.css';

const { Content } = Layout;
const paragraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

class HomePage extends Component {
  _renderFeaturedResumes() {
    return(
      <div className="custom-wrapper">
        <h2>Featured Resume</h2>
        <Row className="margin-row" gutter={16} >
          <Col span={6}>
            <div className="gutter-box">Resume 1</div>
          </Col>
          <Col span={6}>
            <div className="gutter-box">Resume 2</div>
          </Col>
          <Col span={6}>
            <div className="gutter-box">Resume 3</div>
          </Col>
          <Col span={6}>
            <div className="gutter-box">Resume 4</div>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    return (
      <Content >
        <Row>
          <Col className="homepage-main-img" span={24}>
            <h1 className="homepage-main-h1">Currently Under Construction</h1>
            <p className="homepage-main-p">{ `${paragraph} ${paragraph}` }</p>
          </Col>
        </Row>
        { this._renderFeaturedResumes() }
        { this._renderFeaturedResumes() }
      </Content>
    );
  }
}

export default HomePage