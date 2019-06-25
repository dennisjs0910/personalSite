import React, { Component } from "react";
import { Document, Page } from "react-pdf/dist/entry.webpack";
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
      <Content className="resume-container main-img">
        <Document
          className="pdf-container"
          file="https://res.cloudinary.com/dsospjk5r/image/upload/v1561430482/dennisResume_tllpwm.pdf"
        >
          <Page pageNumber={pageNumber} width={800}/>
        </Document>
      </Content>
    );
  }
}

