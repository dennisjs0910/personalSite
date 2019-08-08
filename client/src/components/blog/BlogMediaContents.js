import React, { Component } from 'react';
import { Button, Modal, Container, Image } from 'semantic-ui-react'
import { ParagraphContainer, MediaItem } from './';

const ItemBody = ({ content }) => (
  <Container className="blog-item-body">
    <MediaItem content={ content } />
    <ParagraphContainer summary={ content.summary } />
  </Container>
);

export default class BlogMediaContents extends Component {
  render() {
    const { contents } = this.props;
    return contents.map((content, idx) => <ItemBody key={ idx } content={ content }/>);
  }
}