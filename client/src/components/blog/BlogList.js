import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import BlogItem from './BlogItem';
import "./BlogList.css";

const GRID_WIDTH_PROPS = {
  computer: 12,
  mobile: 16,
  tablet: 16,
  widescreen: 10
}

const BlogItemList = ({ blogs, handleReadModal }) => {
  return blogs.map((item) =>
    <Grid.Row className="blog-item-row">
      <Grid.Column {...GRID_WIDTH_PROPS} >
        <BlogItem
          key={ item.id }
          item={item}
          handleReadModal={handleReadModal}
        />
      </Grid.Column>
    </Grid.Row>
  );
};

class BlogList extends Component {
  render() {
    const { blogs, handleReadModal } = this.props;
    return (
      <Grid className="blog-list-container-grid">
        <BlogItemList blogs={ blogs } handleReadModal={ handleReadModal } />
      </Grid>
    );
  }
}

export default BlogList;