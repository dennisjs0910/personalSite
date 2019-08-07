import React, { Component } from 'react';
import { Image, List, Container, Button } from 'semantic-ui-react'

const ItemHeader = ({ title }) => (
  <List.Header
    as='h3'
    onClick={() => console.log("todo open modal!") }
    className="blog-item-header"
  >{ title }
  </List.Header>
);

const ItemBody = ({ content, summary }) => (
  <Container className="blog-item-body">
    <ItemMedia content={ content } />
    <ItemParagraph summary={ summary} />
  </Container>
);

const ItemMedia = ({ content }) => {
  if (!content) return null;
  if (content.is_video) {
    return (
      <video controls className="blog-item-media">
        <source src={ content.media_url } type="video/mp4"/>
      </video>
    );
  } else {
    return (<Image className="blog-item-media" src={ content.media_url } />);
  }
};

const ItemParagraph = ({ summary }) => {
  const paragraphs = summary.substring(0, Math.min(1000, summary.length)).split("\n");
  return (
    <Container>
     { paragraphs.map((paragraph, idx) => <p key={ idx }>{ paragraph }</p>) }
    </Container>
  );
};

class BlogItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <List.Item>
        <List.Content>
          <ItemHeader title={ item.title } />
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