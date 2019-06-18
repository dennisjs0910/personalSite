import React, { Component } from "react";
import { Layout, Row, Col } from 'antd';
import './HomePage.css';
import textFile from './data/home-paragraph.json';
const { Content } = Layout;

class HomePage extends Component {
  renderFeaturedResumes() {
    return(
      <div className="wrapper-content-margin">
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
          <Col span={24}>
            <div id ="homepage-header" className="main-img">
              <h1 className="homepage-main-h1">Personal Blog K8S</h1>
              <p className="homepage-main-p">{`${textFile.paragraph}`}</p>
            </div>
          </Col>
        </Row>
        { this.renderFeaturedResumes() }
      </Content>
    );
  }
}

export default HomePage