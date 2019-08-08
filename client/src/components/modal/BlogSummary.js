import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import ItemParagraph from './ItemParagraph';

export default class BlogSummary extends Component {
  render() {
    return (
      <Container className="blog-item-body">
        <ItemParagraph summary={ this.props.blog.summary } />
      </Container>
    );
  }
}