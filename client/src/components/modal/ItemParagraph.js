import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'

export default class ItemParagraph extends Component {
  render() {
    const { summary, limit } = this.props;
    let paragraphs = summary.split("\n");
    if (!!limit) {
      paragraphs = summary.substring(0, Math.min(1000, summary.length)).split("\n");
    }

    return (
      <Container>
       { paragraphs.map((paragraph, idx) => <p key={ idx }>{ paragraph }</p>) }
      </Container>
    );
  }
}