import React, { Component } from "react";
import { Icon, Row, Col } from 'antd';
import './Page404.css';

export default class Page404 extends Component {

  render() {
    return (
      <Row className="page404-container">
        <Col span={24}>
          <div className="icon-text-algin">
            <Icon type="warning" theme="filled" />
            <h1 className='page404-header'>Page 404</h1>
            </div>
        </Col>
        <Col span={24}>
          <div className="sub-text-container">
            <h2>{ "Sorry, we couldn't find this page" }</h2>
          </div>
        </Col>
      </Row>
    );
  }
}
