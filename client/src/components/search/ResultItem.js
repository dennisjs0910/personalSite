import React, { Component } from 'react';
import { Label, List, Image } from 'semantic-ui-react'
import { TagsContainer } from '../tag';
const TAG_LIMIT = 10;

const ResultItem = ({ id, title, summary, contents, category }) => {
  return(
    <List.Item>
      <List.Content>
        { contents && contents.length > 0 && !contents[0].is_video &&
          <Image src={ contents[0].media_url }/>
        }
        <List.Header as='h4'>{ title }</List.Header>
        <List.Description>{ summary }</List.Description>
        <TagsContainer category={ category } limit={ TAG_LIMIT } />
      </List.Content>
    </List.Item>
  );
}

export default ResultItem;