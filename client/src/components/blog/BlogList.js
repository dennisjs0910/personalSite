import React, { Component } from 'react';
import { Alert, Layout, Row, Col, Button, Card, Pagination, List } from 'antd';
import "./BlogList.css";

const ROW_NUM = 24;
const PER_PAGINATION = 3;
const { Content } = Layout;

class BlogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageMin: 0,
      pageMax: PER_PAGINATION,
    }
  }

  /**
   * Shortens image_text of blog that is to be displayed.
   * @param  {String} text
   * @return {String}    first 197 chars of image_text appended with ...;
   */
  shortenImageDescription = (text) => {
    if (text && text.length <= 920) return text;
    const end = Math.min(text.length, 917);
    return text.substring(0, end) + "...";
  };

  /**
   * When user clicks on < or > it will recalculate indexes that are to be shown.
   * @param  {int} value [page number]
   */
  handlePaginationChange = value => {
    if (value <= 1) {
      this.setState({
        pageMin: 0,
        pageMax: PER_PAGINATION
      });
    } else {
      this.setState({
        pageMin: Math.max(1, value - 1) * PER_PAGINATION,
        pageMax: Math.min(Math.max(1, value) * PER_PAGINATION, this.props.blogs.length)
      });
    }
  };

  renderBlogsToCard(blogs) {
    console.log(blogs[0]);
    if (blogs && blogs.length > 0) {
      return blogs.slice(this.state.pageMin, this.state.pageMax).map(blog => {
        return (
          <Col span={ROW_NUM / PER_PAGINATION} key={blog.id}>
            <Card className="blog-card"
              title={blog.title}
              extra={
                <Button onClick={ () => this.props.handleReadModal(blog) } >
                  view
                </Button>
              }
            >
              <p className="blog-card-body">{ blog.summary }</p>
              <div className="tag-container">
                {blog.category}
              </div>
            </Card>
          </Col>
        );
      });
    }
    return null;
  }

  render() {
    const { blogs } = this.props;
    return(
      <Content className="blog-list-container">
        <h2 className="blog-list-header">View All Blogs</h2>
        <div className="wrapper-content-margin blog-card-container">
          <Row gutter={16}>
            { this.renderBlogsToCard(blogs) }
          </Row>

          <div className="pagination-container">
            <Pagination
              defaultCurrent={1}
              defaultPageSize={4}
              onChange={ this.handlePaginationChange }
              total={ blogs.length }
            />
          </div>
        </div>
      </Content>
    );
  }
}

export default BlogList;