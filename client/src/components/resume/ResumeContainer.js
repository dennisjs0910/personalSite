import React, { Component } from "react";
import { Document, Page } from "react-pdf";
import { Container, Grid } from 'semantic-ui-react'
import "./Resume.css";

const fileUrl = "https://res.cloudinary.com/dsospjk5r/image/upload/v1566948341/dennisResume_ddud4v.pdf";
const DocumentContainer = ({ pageNumber, ...rest }) => (
  <Container { ...rest } className="fullscreen resume-container main-img">
    <div className="resume-container-body">
      <Document className="pdf-container" file= { fileUrl }>
        <Page pageNumber={pageNumber} width={800}/>
      </Document>
    </div>
  </Container>
);

export default class ResumeContainer extends Component {
  state = {
    pageNumber: 1,
  }

  render() {
    const { pageNumber } = this.state;

    return (
      <Grid>
        <Grid.Row>
          <DocumentContainer pageNumber={pageNumber} />
        </Grid.Row>
      </Grid>
    );
  }
}

