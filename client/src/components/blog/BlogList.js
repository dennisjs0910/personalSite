import React, { Component } from 'react';
import { List } from 'semantic-ui-react'
import BlogItem from './BlogItem';
import "./BlogList.css";


const ListItems = ({ blogs, handleReadModal }) => {
  return blogs.map((item) => <BlogItem key={ item.id } item={item} handleReadModal={handleReadModal} />);
};

class BlogList extends Component {
  render() {
    const { blogs, handleReadModal } = this.props;
    return (
      <List divided verticalAlign='middle' size='large'>
        <ListItems blogs={ blogs } handleReadModal={ handleReadModal } />
      </List>
    );
  }
}

export default BlogList;