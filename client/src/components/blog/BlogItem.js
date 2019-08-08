import React, { Component } from 'react';
import { Image, List, Container, Button } from 'semantic-ui-react'
import MediaItem from './MediaItem';
import ParagraphContainer from './ParagraphContainer';

const MEDIA_SUMMARY_LIMIT = 1000;

const ItemHeader = ({ item, handleReadModal }) => (
  <List.Header
    as='h3'
    onClick={() => handleReadModal(item) }
    className="blog-item-header"
    content={ item.title }
  />
);

const ItemBody = ({ content, summary }) => (
  <Container className="blog-item-body">
    <MediaItem content={ content } />
    <ParagraphContainer summary={ summary } limit={ MEDIA_SUMMARY_LIMIT } />
  </Container>
);

class BlogItem extends Component {
  render() {
    const { item, handleReadModal } = this.props;
    return (
      <List.Item>
        <List.Content>
          <ItemHeader
            item={ item }
            handleReadModal={ handleReadModal }
          />
          <ItemBody
            content={ item.contents && item.contents[0] }
            summary={ item.summary }
          />
          <Button>view</Button>
        </List.Content>
      </List.Item>
    );
  }
}

export default BlogItem;