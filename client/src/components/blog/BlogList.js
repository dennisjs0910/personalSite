import React, { Component } from 'react';
import { List } from 'semantic-ui-react'
import BlogItem from './BlogItem';
import "./BlogList.css";


const ListItems = ({ blogs }) => {
  return blogs.map((item) => <BlogItem key={ item.id } item={item}/>);
};

class BlogList extends Component {
  render() {
    const { blogs } = this.props;
    return (
      <List divided verticalAlign='middle' size='large'>
        <ListItems blogs={ blogs } />
      </List>
    );
  }
}

export default BlogList;