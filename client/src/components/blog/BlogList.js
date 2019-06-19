import React, { Component } from 'react';
import { Layout, Row, Col, Button, Card, Pagination } from 'antd';
import "./BlogList.css";

const ROW_NUM = 24;
const PER_PAGINATION = 2;
const TAGS_PER_BLOG = 5;
const { Content } = Layout;

class BlogList extends Component {
  constructor(props) {
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
      this.setState({
        pageMin: Math.max(1, value - 1) * perPageSquare,
        pageMax: Math.min(Math.max(1, value) * perPageSquare)
      });
    }
  };

  getBlogTags = (blog, tagNum) => {
    let tags = [];
    for (let i = 0; i < tagNum; i++) {
      if (!!blog.category[i]) {
        tags.push(<p className="blog-tag tagged">{blog.category[i]}</p>);
      } else {
        tags.push(<p className="blog-tag tagged"></p>);
      }
    }

    return tags;
  };

  renderBlogsToCard(blogs) {
    if (blogs && blogs.length > 0) {
      const toRender = blogs.slice(this.state.pageMin, this.state.pageMax);
      return toRender.map(blog => {
        return (
          <Col span={ROW_NUM / PER_PAGINATION} key={blog.id}>
            <Card className="blog-card"
              title={blog.title}
              extra={
                <Button onClick={ () => this.props.handleReadModal(blog) } >
                  view
                </Button>
              }
              actions={this.getBlogTags(blog, TAGS_PER_BLOG)}
            >
              <p className="blog-card-body">{ blog.summary }</p>
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
        <div className="blog-card-container">
          <div className="wrapper-content-margin">
            <Row gutter={16}>
              { this.renderBlogsToCard(blogs) }
            </Row>
          </div>

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