import React, { Component } from 'react';
import { Button, Modal, Container, Image } from 'semantic-ui-react'
import ItemParagraph from './ItemParagraph';
import ItemMedia from './ItemMedia';

const ItemBody = ({ content }) => (
  <Container className="blog-item-body">
    <ItemMedia content={ content } />
    <ItemParagraph summary={ content.summary } />
  </Container>
);

export default class BlogMediaContents extends Component {
  render() {
    const { contents } = this.props;
    return contents.map((content, idx) => <ItemBody key={ idx } content={ content }/>);
  }
}