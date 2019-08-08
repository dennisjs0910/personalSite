import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import ParagraphContainer from './ParagraphContainer';

export default class BlogSummary extends Component {
  render() {
    return (
      <Container className="blog-item-body">
        <ParagraphContainer summary={ this.props.blog.summary } />
      </Container>
    );
  }
}