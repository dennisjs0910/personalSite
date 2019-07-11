import React, { Component } from "react";
import { Document, Page } from "react-pdf";
import { Layout } from 'antd';
import "./Resume.css";
const { Content } = Layout;

export default class ResumeContainer extends Component {
  state = {
    pageNumber: 1,
  }

  render() {
    const { pageNumber } = this.state;

    return (
      <Content className="fullscreen resume-container main-img">
        <div className="resume-container-body">
          <Document
            className="pdf-container"
            file="https://res.cloudinary.com/dsospjk5r/image/upload/v1562879219/dennisResume_ojtxi9.pdf"
          >
            <Page pageNumber={pageNumber} width={800}/>
          </Document>
        </div>
      </Content>
    );
  }
}

