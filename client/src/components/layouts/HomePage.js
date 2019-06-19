import React, { Component } from "react";
import { Layout, Row, Col, List } from 'antd';
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

  renderTechStack() {
    const listJsx = textFile.techStacks.map((techStack) => (
      <List className="home-page-list"
        key={techStack.title}
        header={<h2 className="homepage-main">{techStack.title}</h2>}
        itemLayout="horizontal"
        dataSource={ techStack.list }
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={<a target="_blank" rel="noopener noreferrer" className="homepage-main"href={item.link}>{item.title}</a>}
            />
          </List.Item>
        )}
      />
    ));
    return(
      <div className="homepage-list">
        { listJsx }
      </div>
    );
  }

  render() {
    return (
      <Content className="fullscreen homepage-container main-img">
        <div className="homepage-body">
          <Row>
            <Col span={24}>
              <h1 className="homepage-main">jsydennis Blog</h1>
              <p className="homepage-main">{`${textFile.paragraph}`}</p>
              { this.renderTechStack() }
            </Col>
          </Row>
        </div>
      </Content>
    );
  }
}

export default HomePage