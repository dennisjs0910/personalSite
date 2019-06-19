import React, { Component } from 'react';
import { Layout, Row, Col, Button, Card, Pagination } from 'antd';
import "./BlogList.css";

const ROW_NUM = 24;
const PER_PAGINATION = 2;
const { Content } = Layout;

class BlogList extends Component {
  constructor(props) {
    console.log(props.blogs);
    super(props);
    this.state = {
      pageMin: 0,
      pageMax: PER_PAGINATION * PER_PAGINATION,
      curPage: 1
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
    const perPageSquare = (PER_PAGINATION * PER_PAGINATION);
    if (value <= 1) {
      this.setState({
        pageMin: 0,
        pageMax: perPageSquare
      });
    } else {
      console.log('from idx:' , Math.max(1, value - 1) * perPageSquare);
      console.log('to idx:' , Math.min(Math.max(1, value) * perPageSquare, this.props.blogs.length));
      this.setState({
        pageMin: Math.max(1, value - 1) * perPageSquare,
        pageMax: Math.min(Math.max(1, value) * perPageSquare)
      });
    }
  };

  renderBlogsToCard(blogs) {
    if (blogs && blogs.length > 0) {
      // const start = this.state.pageMin *
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